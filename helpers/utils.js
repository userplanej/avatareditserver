const messages = require('./messages');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const axios = require('axios');

const { errorLog } = require('./loggers');
const { NOTIFICATION_EMAIL } = process.env;

module.exports = async function controllerBuilder({
    controllerName,
    serviceCall,
    serviceData,
    succesMsg,
}) {
    let response = { ...messages.defaultServerResponse };
    try {
        const responseFromService = await serviceCall(serviceData);
        response.status = 200;
        response.message = succesMsg;
        response.body = responseFromService;
    } catch (error) {
        errorLog( 'ERROR:',`Something went wrong: Controller: ${controllerName}\n${error.message}`);
        response.message = error.message;
    }

    return response;
};

module.exports.generateToken = (dataObj) => {
    const payload = { user: dataObj.email };
    return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports.validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

module.exports.validateToken = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: '2d',
        };
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.JWT_SECRET, options);

            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            //throw new Error(err);
            res.status(401).send(err);
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401,
        };
        res.status(401).send(result);
    }
};
/**
 * @params string // the token in the header
 * @returns string|number // the user id
 */

module.exports.decodeToken = async (token) => {
    const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY || 'tokenSigningSecretKey'
    );
    return decoded.id;
};

module.exports.sendCodeToEmail = async ({
    email,
    full_name,
    verification_code,
}) => {
    console.log(verification_code);
    try {
        let body = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Registration Email',
            html: `<h1>Hello ${full_name}</h1><p>Welcome to gorilla table.<br>please use this code to finish registration : ${verification_code}</p>`,
        };

        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail(body);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
};

module.exports.sendSMS = async ({ title, message, mobile }) => {
    try {
        const data = {
            title,
            message,
            sender: process.env.DIRECT_SMS_SENDER_PHONE,
            username: process.env.DIRECT_SMS_USERNAME,
            key: process.env.DIRECT_SMS_KEY,
            receiver: [
                {
                    //name: 'test',
                    //mobile: '01022449160',
                    //note1: 'test',
                    mobile,
                },
            ],
        };
        const url = 'https://directsend.co.kr/index.php/api_v2/sms_change_word';
        const result = await axios.post(url, data);
        return result.data;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.sendVerificationCodeSMS = async (code, receiverArr) => {
    const data = {
        title: 'Verification Code',
        message: `#${code} is the verification code to reset your password`,
        sender: process.env.DIRECT_SMS_SENDER_PHONE,
        username: process.env.DIRECT_SMS_USERNAME,
        key: process.env.DIRECT_SMS_KEY,
        receiver: receiverArr,
    };

    const url = 'https://directsend.co.kr/index.php/api_v2/sms_change_word';
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports.sendPhoneOtpSMS = async (code, receiverArr) => {
    const data = {
        title: 'Otp Code',
        message: `${code} is the one time password from gorilla partners`,
        sender: process.env.DIRECT_SMS_SENDER_PHONE,
        username: process.env.DIRECT_SMS_USERNAME,
        key: process.env.DIRECT_SMS_KEY,
        receiver: receiverArr,
    };
    console.log(data);
    const url = 'https://directsend.co.kr/index.php/api_v2/sms_change_word';
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports.formatDateTime = (date) => {
    return [
        date.getFullYear() +
            '-' +
            (date.getMonth() + 1 < 10 ? '0' : '') +
            (date.getMonth() + 1) +
            '-' +
            (date.getDate() < 10 ? '0' : '') +
            date.getDate(),

        (date.getHours() < 10 ? '0' : '') +
            date.getHours() +
            ':' +
            (date.getMinutes() < 10 ? '0' : '') +
            date.getMinutes(),
    ];
};


module.exports.sendEmail = async (sendEmailPayload) => {
    try {
        let body = {
            to: NOTIFICATION_EMAIL,
            subject: "Customer Service",
            html: `Hello Gorrila Customer Service admin,
            <p>You have received a query from <b>${sendEmailPayload.email}</b></h3></p>
            <p><b>Title:</b> ${sendEmailPayload.subject}</p>
            <p> <b>Description:</b> <q>${sendEmailPayload.description} </q></p>
            <p></p>
            Thnaks.
            `,
        };

        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail(body);
    } catch (err) {
        throw new Error(err);
    }
};
