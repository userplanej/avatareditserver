const { models } = require('../database/index');

const { decodeToken } = require('../helpers/utils');
const messages = require('../helpers/messages');
const { errorLog } = require('../helpers/loggers');

module.exports.isAuthenticated = () => async (req, res, next) => {
    req._isAuthenticated = false;
    try {
        const token =
            req.headers.authorization &&
            req.headers.authorization.split(' ')[1];
        if (!token) {
            return next();
        }

        const userId = await decodeToken(token);
        const foundUser = await models.user.findOne({ where: { id: userId } });
        const foundSeller = await models.seller.findOne({
            where: { user_id: userId },
        });
        if (!!foundUser) {
            const user = foundUser.toJSON();
            delete user.password;
            req._isAuthenticated = true;
            req.user = user;
            req.seller = foundSeller ? foundSeller.toJSON() : false;
        }
        return next();
    } catch (error) {
        next(error);
    }
};

module.exports.checkIfAuthenticated = (apiName) => (req, res, next) => {
    const response = { ...messages.defaultServerResponse };
    try {
        if (req.isAuthenticated() || req._isAuthenticated) {
            return next();
        }

        throw new Error(messages.apiResponse.NEED_AUTHENTICATION);
    } catch (error) {
        errorLog(
            'UNAUTHENTICATED REQUEST: ',
            'there was an unauthenticated request to ' + apiName
        );

        response.message = error.message;
        response.status = 401;
    }

    return res.status(response.status).send(response);
};
