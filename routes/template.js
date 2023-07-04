const templateController = require('../controllers/template');

module.exports = (router) => {
    router.post(
        '/create',
        templateController.create
    );
    router.get(
        '/list',
        templateController.getAll
    );
    router.get(
        '/detail/:template_id',
        templateController.getDetail
    );
    router.put(
        '/update/:template_id',
        templateController.update
    );
    router.delete(
        '/delete/:template_id',
        templateController.delete
    );
    return router;
};
