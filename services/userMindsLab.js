const { models } = require('../database/index');
const messages = require('../helpers/messages');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');
const saltRounds = 10;

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  

module.exports.createUser = async (data) => {
    try {
        const { userMindsLabData } = data;
        const { email, password, password_confirm } = userMindsLabData;
        const user = await models.user_minds_lab.findOne({
            where: { email },
            attributes: ['email', 'phone', 'name', 'bio', 'company', 'create_date', 'update_date']
        })
        
        if (user) throw new Error(messages.user_minds_lab.EMAIL_EXISTS);
        if (password !== password_confirm) throw new Error(messages.user_minds_lab.PASSWORD_NOT_MATCH);
        if (!user) {
            const hashedPassword = await hashPassword(password);
            userMindsLabData.password = hashedPassword
            userMindsLabData.password_confirm = hashedPassword

            const createNewUserMindsLab = await models.user_minds_lab.create({...userMindsLabData})
            const activation_code = await createUniqueCode(6);
            const data = {
                activation_code
            }
            await models.user_minds_lab.update(data,{
                where: {
                    user_id: createNewUserMindsLab.user_id
                }
            });
            sendUniqueCodeToUserEmail(email, {activation_code})
            createNewUserMindsLab.password = undefined
            createNewUserMindsLab.password_confirm = undefined
            createNewUserMindsLab.is_allow = undefined
            return createNewUserMindsLab
        }
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllUser = async (data) => {
    try {
        const where = {}

        if(data.user_id) {
            where.user_id = data.user_id
        }

        if(data.is_admin) {
            where.is_admin = data.is_admin
        }

        const usersMindsLab = await models.user_minds_lab.findAndCountAll({
            where,
            attributes: ['user_id', 'email', 'phone', 'name', 'bio', 'company', 'create_date', 'update_date']
        });
        return usersMindsLab
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getUser = async (data) => {
    try {
        const { user_id } = data
        const userMindsLab = await models.user_minds_lab.findOne({
            where: {
              user_id
            },
            attributes: ['user_id', 'email', 'phone', 'name', 'bio', 'company','create_date', 'update_date']
        });
        return userMindsLab
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateUser = async (data) => {
    try {
        const { user_id, userMindsLabData } = data
        if(!userMindsLabData.secret_code || userMindsLabData.secret_code !== process.env.SECRET_CODE) {
            delete userMindsLabData.is_admin
        }
        const checkId = await models.user_minds_lab.findOne({
            where: {
                user_id
            }
        });
        if(!checkId) throw new Error(messages.user_minds_lab.USER_ID_NOT_EXISTS);
        if(userMindsLabData.currentPassword && !userMindsLabData.newPassword) throw new Error(messages.user_minds_lab.NEW_PASSWORD_NOT_FOUND);
        if(checkId && !userMindsLabData.currentPassword && !userMindsLabData.newPassword) {
            let data = {...userMindsLabData}
            const userMindsLab = await models.user_minds_lab.update(data,{
                where: {
                    user_id
                }
            });
            return userMindsLab
        }
        if(checkId && userMindsLabData.currentPassword && userMindsLabData.newPassword) {
            if(!bcrypt.compareSync(userMindsLabData.currentPassword, checkId.password)) throw new Error(messages.user_minds_lab.OLD_PASSWORD_NOT_MATCH);
            let data = {}
            if(bcrypt.compareSync(userMindsLabData.currentPassword, checkId.password)) {
                const hashedPassword = await hashPassword(userMindsLabData.newPassword);
                data.password = hashedPassword
                data.password_confirm = hashedPassword
                const userMindsLab = await models.user_minds_lab.update(data,{
                    where: {
                        user_id
                    }
                });
                return userMindsLab
            }
            data = {...userMindsLabData}
            delete data.currentPassword
            const userMindsLab = await models.user_minds_lab.update(data,{
                where: {
                    user_id
                }
            });
            return userMindsLab
        }


    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteUser = async (data) => {
    try {
        const { user_id } = data
        const checkId = await models.user_minds_lab.findOne({
            where: {
              user_id
            }
        });

        if(!checkId) throw new Error(messages.user_minds_lab.USER_ID_NOT_EXISTS);

        await models.user_minds_lab.destroy({
            where: {
              user_id
            }
        });
        return
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.userSignIn = async (data) => {
    try {
        const { userMindsLabData } = data;
        const { email, password } = userMindsLabData;
        const user = await models.user_minds_lab.findOne({
            where: { email },
            attributes: ['user_id', 'email', 'phone', 'password', 'name', 'bio', 'company', 'is_admin','is_active']
        })
        if (!user)throw new Error(messages.user_minds_lab.USER_ID_NOT_EXISTS);

        if (!bcrypt.compareSync(password, user.password)) throw new Error(messages.user_minds_lab.EMAIL_PASSWORD_NOT_MATCH);

        if (user.is_active === false) throw new Error(messages.user_minds_lab.ACCOUNT_NOT_ACTIVE);

        if (user && bcrypt.compareSync(password, user.password)){
            delete user.dataValues.password
            return user
        }
            
    } catch (err) {
        throw new Error(err);
    }
};

async function createUniqueCode(length) {
    let result = '';
    const string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        result += string.charAt(Math.floor(Math.random() * string.length));
    }

    return result;
}
  
async function sendUniqueCodeToUserEmail(userEmail, uniqueCode) {
    const { activation_code, reset_code } = uniqueCode
    const senderEmail = process.env.EMAIL_SENDER;
    const senderPassword = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    })
    if(reset_code && !activation_code) {
        const emailInfo = await transporter.sendMail({
            from: 'adminMindslab <admin@luxpmsoft.com>',
            to: userEmail,
            subject: 'MindsLab Forget Password ',
            html: `
            <h3>Hi!</h3>
            <h3>Here is the unique code for your forget password</h3>
            <h3>this unique code will expire in 30 minutes </h3>
            <h1>${uniqueCode}</h1>
            `
        });
        return emailInfo;
    }

    if(activation_code && !reset_code) {
        const emailInfo = await transporter.sendMail({
            from: 'adminMindslab <admin@luxpmsoft.com>',
            to: userEmail,
            subject: 'MindsLab Activation Account ',
            html: `
            <h3>Hi!</h3>
            <h3>Here is the unique code for your activation account</h3>
            <h3>this unique code will expire in 30 minutes </h3>
            <h1>${uniqueCode}</h1>
            `
        });
        return emailInfo;
    }
    
};

module.exports.sendResetCode = async (data) => {
    try {
        const { userMindsLabData } = data;
        const { email } = userMindsLabData;
        const user = await models.user_minds_lab.findOne({
            where: { email },
            attributes: ['user_id', 'reset_code']
        })
        if (!user)throw new Error(messages.user_minds_lab.USER_ID_NOT_EXISTS);

        if (user){
            const expDate = new Date(Date.now() - 10 * 60 * 1000);
            const foundUserCode = await models.user_minds_lab.findOne({
            where: {
                user_id: user.user_id,
                reset_time: {
                    [Sequelize.Op.gt]: expDate
                }
            }
            });
            if (foundUserCode) throw new Error(messages.user_minds_lab.RESET_CODE_SENT)

            if (!foundUserCode) {
                const reset_code = await createUniqueCode(6);
                const data = {
                    reset_code,
                    reset_time: Date.now()
                }
                await models.user_minds_lab.update(data,{
                    where: {
                        user_id: user.user_id
                    }
                });
                sendUniqueCodeToUserEmail(email, {reset_code})
            }
        } 
    } catch (err) {
        throw new Error(err);
    }
};


module.exports.checkCode = async (data) => {
    try {
        const { userMindsLabData } = data;
        const { email, reset_code, activation_code } = userMindsLabData;
        const user = await models.user_minds_lab.findOne({
            where: {
                email
            },
            attributes: ['user_id', 'email', 'reset_code', 'is_allow', 'activation_code']
        })
        if (!user)throw new Error(messages.user_minds_lab.USER_ID_NOT_EXISTS);

        if (user){
            const expDate = new Date(Date.now() - 10 * 60 * 1000);
            const where = {
                user_id: user.user_id,
            }
            if(reset_code) {
                where.reset_code = reset_code
                where.reset_time = { [Sequelize.Op.gt]: expDate }
                const foundUserCode = await models.user_minds_lab.findOne({
                    where
                });
                if (!foundUserCode) throw new Error(messages.user_minds_lab.CODE_INVALID)
    
                if (foundUserCode) {
                    const data = {
                        is_allow: true,
                        reset_code: null
                    }
                    await models.user_minds_lab.update(data,{
                        where: {
                            user_id: user.user_id
                        }
                    });
                }
            }

            if(activation_code) {
                where.activation_code = activation_code
                where.update_date = { [Sequelize.Op.gt]: expDate }
                const foundUserCode = await models.user_minds_lab.findOne({
                    where
                });
                if (!foundUserCode) throw new Error(messages.user_minds_lab.CODE_INVALID)
                const data = {
                    is_active: true,
                    activation_code: null
                }
                await models.user_minds_lab.update(data,{
                    where: {
                        user_id: user.user_id
                    }
                });
            }

        } 
    } catch (err) {
        throw new Error(err);
    }
};


module.exports.newPassword = async (data) => {
    try {
        const { userMindsLabData } = data
        const { email, newPassword } = userMindsLabData;
        const checkUser = await models.user_minds_lab.findOne({
            where: {
                email,
                is_allow: true
            }
        });
        if(!checkUser) throw new Error(messages.user_minds_lab.CHANGE_PASSWORD_NOT_ALLOWED);
        if(!userMindsLabData.newPassword) throw new Error(messages.user_minds_lab.NEW_PASSWORD_REQUIRED);
        if(checkUser && userMindsLabData.newPassword) {
            let data = {}
            const hashedPassword = await hashPassword(newPassword);
            data.password = hashedPassword
            data.password_confirm = hashedPassword
            data.is_allow = false
            data.reset_time = null

            const updatePassword = await models.user_minds_lab.update(data, {
                where: {
                    user_id: checkUser.user_id
                }
            })
            return updatePassword
        }


    } catch (err) {
        throw new Error(err);
    }
};