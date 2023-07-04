const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createImage,
  getAllImages,
  getImage,
  updateImage,
  deleteImage } = require('../services/imageList');

module.exports.create = async (req, res) => {
  const imageData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Image',
      serviceCall: createImage,
      serviceData: { imageData },
      succesMsg: messages.image_list.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Image list',
        serviceCall: getAllImages,
        serviceData: { ...req.query },
        succesMsg: messages.image_list.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { image_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Image Detail',
      serviceCall: getImage,
      serviceData: { image_id, ...req.query },
      succesMsg: messages.image_list.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { image_id }  = req.params;
  const imageData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Image',
      serviceCall: updateImage,
      serviceData: {image_id, imageData },
      succesMsg: messages.image_list.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { image_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Image',
      serviceCall: deleteImage,
      serviceData: { image_id },
      succesMsg: messages.image_list.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
