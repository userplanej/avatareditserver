const imagePackageController = require('../controllers/imagePackage');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        imagePackageController.create
    );
    router.get(
        '/list',
        imagePackageController.getAll
    );
    router.get(
        '/detail/:package_id',
        imagePackageController.getDetail
    );
    router.put(
        '/update/:package_id',
        imagePackageController.update
    );
    router.delete(
        '/delete/:package_id',
        imagePackageController.delete
    );
    return router;
};
