const outputController = require('../controllers/output');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        outputController.create
    );
    router.get(
        '/list',
        outputController.getAll
    );
    router.get(
        '/detail/:output_id',
        outputController.getDetail
    );
    router.put(
        '/update/:output_id',
        outputController.update
    );
    router.delete(
        '/delete/:output_id',
        outputController.delete
    );
    return router;
};
