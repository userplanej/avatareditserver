const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const { models } = require('../database/index');

const messages = require('../helpers/messages');
const { errorLog } = require('../helpers/loggers');

const applyAuthStrategies = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            localStrategy
        )
    );

    passport.use(
        'facebook',
        new FacebookStrategy(
            {
                // pull in our app id and secret from our auth.js file
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL:
                    'http://18.191.34.70:3000/api/v1/customer/auth/facebook/callback',
                profileFields: ['name', 'picture.type(large)', 'email'],
            },
            strategyCallback('FACEBOOK AUTH STRATEGY', facebookUserConstructor)
        )
    );

    passport.use(
        'naver',
        new NaverStrategy(
            {
                clientID: process.env.NAVER_APP_ID,
                clientSecret: process.env.NAVER_APP_SECRET,
                callbackURL:
                    'http://18.191.34.70:3000/api/v1/customer/auth/naver/callback',
            },
            strategyCallbackNavar('NAVER AUTH STRATEGY', naverUserConstructor)
        )
    );

    passport.use(
        'kakao',
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_APP_ID,
                callbackURL:
                    'http://18.191.34.70:3000/api/v1/customer/auth/kakao/callback',
            },
            strategyCallback('KAKAO AUTH STRATEGY', kakaoUserConstructor)
        )
    );
};

async function localStrategy(username, password, done) {
    try {
        const user = await models.user.findOne({
            where: { email: username }
        });
        const profileImage = await models.image.findAll({
            logging: console.log,
            where: { user_id: user.dataValues.id },
            order: [['created_at', 'DESC']],
            limit: 1,
        });
        if (!user) {
            return done(new Error(messages.user.USER_NOT_FOUND));
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return done(new Error(messages.user.INVALID_PASSWORD));
        }

        const token = jwt.sign(
            { id: user.dataValues.id },
            process.env.SECRET_KEY || 'tokenSigningSecretKey'
        );
        const customer = await models.customer.findOne({
            where: { user_id: user.dataValues.id }
        });
        if (!!customer) {
            customer.token = token;

            await customer.save();
        }

        return done(null, {
            token,
            user_id: user.id,
            email: user.email,
            phone: user.phone,
            full_name: user.full_name,
            image: profileImage && profileImage.length > 0 ? profileImage[0].directory : null,
        });
    } catch (err) {
        done(new Error(err));
    }
}

function strategyCallback(errorMsg, userConstructor) {
    return (token, refreshToken, profile, done) => {
        // asynchronous
        process.nextTick(async () => {
            try {
                const foundCustomer = await models.customer.findOne({
                    where: { auth_provider_id: profile._json.id },
                });

                if (!!foundCustomer) {
                    const user = await models.user.findOne({
                        where: { id: foundCustomer.user_id },
                    });
                    const profileImage = await models.image.findAll({
                        logging: console.log,
                        where: { user_id: foundCustomer.user_id },
                        order: [['created_at', 'DESC']],
                        limit: 1,
                    });

                    return done(null, {
                        ...user.toJSON(),
                        image: profileImage && profileImage.length > 0 ? profileImage[0].directory : null,
                    }); 
                } 
                else 
                {
                    const user = await models.user.create(
                        {
                        full_name : profile._json.properties.nickname ? profile._json.properties.nickname : "Gorilla user",
                        uid : null,
                        email : profile._json.properties.email ? profile._json.properties.email : profile._json.id+"@gorilla.com",
                        phone : null,
                        password : null,
                        phone_verified : false,
                        email_verified : false,
                        verification_code : null
                        }
                    );                   

                    
                    const customer = await models.customer.create({
                        user_id: user.id,
                        login_type: profile.provider,
                        token: jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'tokenSigningSecretKey'),
                        auth_provider_id: profile._json.id,
                    });
                    
                    //update user token
                    var UserToken = await models.user.findOne({
                        where : {
                           "id" : user.id
                        }
                    });
                    UserToken.token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'tokenSigningSecretKey');
                    UserToken.save();


                    // if successful, return the new user
                    return done(null, {
                        token: jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'tokenSigningSecretKey'),
                        ...user.toJSON(),
                    });
                }
            } catch (err) {
                errorLog(errorMsg, err);
                throw new Error(err);
            }
        });
    };
}

function facebookUserConstructor(profile) {
    return {
        full_name: profile._json.last_name + ' ' + profile._json.first_name,
        email: profile._json.email,
    };
}

function kakaoUserConstructor(profile) {
    return {
        full_name: profile.username ? profile.username : profile.displayName,
        email: profile.email,
    };
}


function strategyCallbackNavar(errorMsg, userConstructor) {
    return (token, refreshToken, profile, done) => {
        console.log(profile);
        // asynchronous
        process.nextTick(async () => {
            try {
                // find the user in the database based on their naver id
                const foundCustomer = await models.customer.findOne({
                    where: { auth_provider_id: profile._json.id },
                });

                if (!!foundCustomer) {
                    const user = await models.user.findOne({
                        where: { id: foundCustomer.user_id },
                    });

                    const profileImage = await models.image.findAll({
                        logging: console.log,
                        where: { user_id: foundCustomer.user_id },
                        order: [['created_at', 'DESC']],
                        limit: 1,
                    });


                    return done(null, {
                        ...user.toJSON(),
                        image: profileImage && profileImage.length > 0 ? profileImage[0].directory : null,
                    }); 
                } else {
                    // if there is no user found with that naver id, create them

                    const user = await models.user.create(
                        userConstructor(profile)
                    );
                    // set all of the naver information in our user model
                    const customer = await models.customer.create({
                        user_id: user.id,
                        login_type: profile.provider,
                        token: jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'tokenSigningSecretKey'),
                        auth_provider_id: profile._json.id,
                    });
                    
                    //update user token
                    var UserToken = await models.user.findOne({
                        where : {
                           "id" : user.id
                        }
                    });
                    UserToken.token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'tokenSigningSecretKey');
                    UserToken.save();

                    // if successful, return the new user
                    return done(null, {
                        token: jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'tokenSigningSecretKey'),
                        ...user.toJSON(),
                    });
                }
            } catch (err) {
                errorLog(errorMsg, err);
                throw new Error(err);
            }
        });
    };
}


function naverUserConstructor(profile) {
    const user = { email: profile._json.email };
    const userName = profile.displayName
        ? profile.displayName
        : profile._json.nickname
            ? profile._json.nickname
            : undefined;

    if (!!userName) {
        user.full_name = userName;
    }

    return user;
}

module.exports = applyAuthStrategies;
