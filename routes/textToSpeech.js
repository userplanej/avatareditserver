const textToSpeechController = require('../controllers/textToSpeech');

module.exports = (router) => {
    router.post(
        '/create',
        textToSpeechController.createVoice
    );
    return router;
};
