const videoListController = require('../controllers/videoList');
const { checkIfAuthenticated } = require('../middlewares/authentication');

module.exports = (router) => {
    router.post(
        '/create',
        videoListController.create
    );
    router.get(
        '/list',
        videoListController.getAll
    );
    router.get(
        '/detail/:video_id',
        videoListController.getDetail
    );
    router.put(
        '/update/:video_id',
        videoListController.update
    );
    router.delete(
        '/delete/:video_id',
        videoListController.delete
    );
    return router;
};
