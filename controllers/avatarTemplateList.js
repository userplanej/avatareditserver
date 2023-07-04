const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createAvatarTemplate,
  getAllAvatarTemplate,
  getAvatarTemplate,
  updateAvatarTemplate,
  deleteAvatarTemplate } = require('../services/avatarTemplateList');

module.exports.create = async (req, res) => {
  const avatarTemplateData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Avatar Template',
      serviceCall: createAvatarTemplate,
      serviceData: { avatarTemplateData },
      succesMsg: messages.avatar_template_list.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Avatar Template list',
        serviceCall: getAllAvatarTemplate,
        serviceData: { ...req.query },
        succesMsg: messages.avatar_template_list.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { avatar_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Avatar Template Detail',
      serviceCall: getAvatarTemplate,
      serviceData: { avatar_id, ...req.query },
      succesMsg: messages.avatar_template_list.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { avatar_id }  = req.params;
  const avatarTemplateData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Avatar Template',
      serviceCall: updateAvatarTemplate,
      serviceData: { avatar_id, avatarTemplateData },
      succesMsg: messages.avatar_template_list.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { avatar_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Avatar Template',
      serviceCall: deleteAvatarTemplate,
      serviceData: { avatar_id },
      succesMsg: messages.avatar_template_list.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
