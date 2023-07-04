const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createOrganization,
  getAllOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization } = require('../services/organization');

module.exports.create = async (req, res) => {
  const organizationData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Organization',
      serviceCall: createOrganization,
      serviceData: { organizationData },
      succesMsg: messages.organization.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Organization list',
        serviceCall: getAllOrganizations,
        serviceData: { ...req.query },
        succesMsg: messages.organization.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { organization_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Organization Detail',
      serviceCall: getOrganization,
      serviceData: { organization_id, ...req.query },
      succesMsg: messages.organization.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { organization_id }  = req.params;
  const organizationData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Organization',
      serviceCall: updateOrganization,
      serviceData: {organization_id, organizationData },
      succesMsg: messages.organization.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { organization_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Organization',
      serviceCall: deleteOrganization,
      serviceData: { organization_id },
      succesMsg: messages.organization.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
