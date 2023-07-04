const avatarTemplateListController = require('../controllers/avatarTemplateList');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        avatarTemplateListController.create
    );
    router.get(
        '/list',
        avatarTemplateListController.getAll
    );
    router.get(
        '/detail/:avatar_id',
        avatarTemplateListController.getDetail
    );
    router.put(
        '/update/:avatar_id',
        avatarTemplateListController.update
    );
    router.delete(
        '/delete/:avatar_id',
        avatarTemplateListController.delete
    );
    return router;
};
