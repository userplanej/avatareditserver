const { models } = require('../database/index');
const messages = require('../helpers/messages');
const fs = require('fs');
const googleTTS = require('google-tts-api');
const FormData = require('form-data');
const axios = require('axios');

module.exports.createVoice = async (data) => {
  try {
    const { voiceData } = data;
    const { text } = voiceData;
    const url = await googleTTS.getAudioBase64(text, {
      lang: 'ko',
      slow: false,
      host: 'https://translate.google.com',
    });
    const getDate = Date.now();
    const outputName = `${getDate}.mp3`
    fs.writeFileSync(process.cwd() + `/download/${outputName}`, Buffer.from(url.replace('data:audio/ogg; codecs=opus;base64,', ''), 'base64'));
    return process.cwd() + `/download/${outputName}`
  } catch (err) {
      throw new Error(err);
  }
};