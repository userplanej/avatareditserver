const userMindsLabController = require('../controllers/userMindsLab');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        userMindsLabController.create
    );
    router.get(
        '/list',
        userMindsLabController.getAll
    );
    router.get(
        '/detail/:user_id',
        userMindsLabController.getDetail
    );
    router.put(
        '/update/:user_id',
        userMindsLabController.update
    );
    router.delete(
        '/delete/:user_id',
        userMindsLabController.delete
    );
    router.post(
        '/signIn',
        userMindsLabController.signIn
    );
    router.post(
        '/sendresetcode',
        userMindsLabController.sendResetCode
    );
    router.post(
        '/checkCode',
        userMindsLabController.checkCode
    );
    router.post(
        '/newpassword',
        userMindsLabController.newPassword
    );
    return router;
};
