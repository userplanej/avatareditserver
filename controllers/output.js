const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createOutput,
  getAllOutputs,
  getOutput,
  updateOutput,
  deleteOutput } = require('../services/output');

module.exports.create = async (req, res) => {
  const outputData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Output',
      serviceCall: createOutput,
      serviceData: { outputData },
      succesMsg: messages.output.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Output list',
        serviceCall: getAllOutputs,
        serviceData: { ...req.query },
        succesMsg: messages.output.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { output_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Output Detail',
      serviceCall: getOutput,
      serviceData: { output_id, ...req.query },
      succesMsg: messages.output.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { output_id }  = req.params;
  const outputData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Output',
      serviceCall: updateOutput,
      serviceData: {output_id, outputData },
      succesMsg: messages.output.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { output_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Output',
      serviceCall: deleteOutput,
      serviceData: { output_id },
      succesMsg: messages.output.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
