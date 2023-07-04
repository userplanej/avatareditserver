const backgroundController = require('../controllers/background');

module.exports = (router) => {
    router.post(
        '/create',
        backgroundController.create
    );
    router.get(
        '/list',
        backgroundController.getAll
    );
    router.get(
        '/detail/:background_id',
        backgroundController.getDetail
    );
    router.put(
        '/update/:background_id',
        backgroundController.update
    );
    router.delete(
        '/delete/:background_id',
        backgroundController.delete
    );
    return router;
};
