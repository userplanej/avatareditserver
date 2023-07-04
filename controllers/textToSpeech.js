const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createVoice
} = require('../services/textToSpeech');

module.exports.createVoice = async (req, res) => {
  const voiceData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Voice',
      serviceCall: createVoice,
      serviceData: { voiceData },
      succesMsg: messages.voices.CREATE_SUCCESS,
  });
  console.log('response', response)
  return res.status(response.status).download(response.body);
};