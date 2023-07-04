const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createImageClip,
  getAllImageClip,
  getImageClip,
  updateImageClip,
  deleteImageClip } = require('../services/imageClip');

module.exports.create = async (req, res) => {
  const clipData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Image Clip',
      serviceCall: createImageClip,
      serviceData: { clipData },
      succesMsg: messages.image_clip.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Image Clip list',
        serviceCall: getAllImageClip,
        serviceData: { ...req.query },
        succesMsg: messages.image_clip.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { clip_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Image Clip Detail',
      serviceCall: getImageClip,
      serviceData: { clip_id, ...req.query },
      succesMsg: messages.image_clip.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { clip_id }  = req.params;
  const clipData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Image Clip',
      serviceCall: updateImageClip,
      serviceData: { clip_id, clipData },
      succesMsg: messages.image_clip.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { clip_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Image Clip',
      serviceCall: deleteImageClip,
      serviceData: { clip_id },
      succesMsg: messages.image_clip.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
