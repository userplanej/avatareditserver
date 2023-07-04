const shapeListController = require('../controllers/shapeList');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        shapeListController.create
    );
    router.get(
        '/list',
        shapeListController.getAll
    );
    router.get(
        '/detail/:shape_id',
        shapeListController.getDetail
    );
    router.put(
        '/update/:shape_id',
        shapeListController.update
    );
    router.delete(
        '/delete/:shape_id',
        shapeListController.delete
    );
    return router;
};
