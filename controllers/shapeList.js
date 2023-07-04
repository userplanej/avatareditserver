const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createShape,
  getAllShape,
  getShape,
  updateShape,
  deleteShape } = require('../services/shapeList');

module.exports.create = async (req, res) => {
  const shapeData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Shape',
      serviceCall: createShape,
      serviceData: { shapeData },
      succesMsg: messages.shape_list.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Shape list',
        serviceCall: getAllShape,
        serviceData: { ...req.query },
        succesMsg: messages.shape_list.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { shape_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Shape Detail',
      serviceCall: getShape,
      serviceData: { shape_id, ...req.query },
      succesMsg: messages.shape_list.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { shape_id }  = req.params;
  const shapeData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Shape',
      serviceCall: updateShape,
      serviceData: { shape_id, shapeData },
      succesMsg: messages.shape_list.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { shape_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Shape',
      serviceCall: deleteShape,
      serviceData: { shape_id },
      succesMsg: messages.shape_list.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
