const imageListController = require('../controllers/imageList');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        imageListController.create
    );
    router.get(
        '/list',
        imageListController.getAll
    );
    router.get(
        '/detail/:image_id',
        imageListController.getDetail
    );
    router.put(
        '/update/:image_id',
        imageListController.update
    );
    router.delete(
        '/delete/:image_id',
        imageListController.delete
    );
    return router;
};
