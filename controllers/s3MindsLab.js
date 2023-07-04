const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');
const s3 = require('../config/s3');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const {
  uploadImage,
  deleteImage,
  sendDataToClientApi } = require('../services/s3MindsLab');

module.exports.upload = async (req, res) => {
  const body = req.body;
  const files = req.files;
  const response = await controllerBuilder({
      controllerName: 'Upload Images',
      serviceCall: uploadImage,
      serviceData: { body, files },
      succesMsg: messages.s3_minds_lab.UPLOAD_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: `${req.query.type}`
    };

    s3.listObjectsV2(params, async function (err, data) {
      if (err) console.log(err, err.stack);
      return res.status(200).json({ message: messages.s3_minds_lab.RETRIEVES_SUCCESS, results: data.Contents });
    });

    } catch (err) {
      throw new Error(err);
  }
};

module.exports.delete = async (req, res) => {
    const { location } = req.body
    const key = location.split('.com/')
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key[1]
    };
    const response = await controllerBuilder({
        controllerName: 'Delete Image',
        serviceCall: deleteImage,
        serviceData: { params },
        succesMsg: messages.s3_minds_lab.DELETED_SUCCESS,
    });
    return res.status(response.status).send(response);
};

module.exports.sendToClientApi = async (req, res) => {
  const body = req.body;
  const response = await controllerBuilder({
    controllerName: 'Send To Client Api',
    serviceCall: sendDataToClientApi,
    serviceData: { body },
    succesMsg: messages.s3_minds_lab.SEND_TO_CLIENT_API,
  })
  return res.status(response.status);
}
