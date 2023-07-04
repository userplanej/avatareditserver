const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createBackground,
  getAllBackgrounds,
  getBackground,
  updateBackground,
  deleteBackground } = require('../services/background');

module.exports.create = async (req, res) => {
  const backgroundData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Background Color',
      serviceCall: createBackground,
      serviceData: { backgroundData },
      succesMsg: messages.background.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Background Color list',
        serviceCall: getAllBackgrounds,
        serviceData: { ...req.query },
        succesMsg: messages.background.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { background_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Background Color Detail',
      serviceCall: getBackground,
      serviceData: { background_id, ...req.query },
      succesMsg: messages.background.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { background_id }  = req.params;
  const backgroundData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Image',
      serviceCall: updateBackground,
      serviceData: {background_id, backgroundData },
      succesMsg: messages.background.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { background_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Image',
      serviceCall: deleteBackground,
      serviceData: { background_id },
      succesMsg: messages.background.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
