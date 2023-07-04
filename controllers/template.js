const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createTemplate,
  getAllTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate } = require('../services/template');

module.exports.create = async (req, res) => {
  const templateData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Template',
      serviceCall: createTemplate,
      serviceData: { templateData },
      succesMsg: messages.template.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Template list',
        serviceCall: getAllTemplates,
        serviceData: { ...req.query },
        succesMsg: messages.template.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { template_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Template Detail',
      serviceCall: getTemplate,
      serviceData: { template_id, ...req.query },
      succesMsg: messages.template.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { template_id }  = req.params;
  const templateData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Template',
      serviceCall: updateTemplate,
      serviceData: {template_id, templateData },
      succesMsg: messages.template.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { template_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Template',
      serviceCall: deleteTemplate,
      serviceData: { template_id },
      succesMsg: messages.template.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
