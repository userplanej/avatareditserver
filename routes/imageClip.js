const imageClipController = require('../controllers/imageClip');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        imageClipController.create
    );
    router.get(
        '/list',
        imageClipController.getAll
    );
    router.get(
        '/detail/:clip_id',
        imageClipController.getDetail
    );
    router.put(
        '/update/:clip_id',
        imageClipController.update
    );
    router.delete(
        '/delete/:clip_id',
        imageClipController.delete
    );
    return router;
};
