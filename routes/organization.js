const organizationController = require('../controllers/organization');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        organizationController.create
    );
    router.get(
        '/list',
        organizationController.getAll
    );
    router.get(
        '/detail/:organization_id',
        organizationController.getDetail
    );
    router.put(
        '/update/:organization_id',
        organizationController.update
    );
    router.delete(
        '/delete/:organization_id',
        organizationController.delete
    );
    return router;
};
