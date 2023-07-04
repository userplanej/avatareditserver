const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createImagePackage,
  getAllImagesPackage,
  getImagesPackage,
  updateImagesPackage,
  deleteImagesPackage } = require('../services/imagePackage');

module.exports.create = async (req, res) => {
  const imagePackageData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Image Package',
      serviceCall: createImagePackage,
      serviceData: { imagePackageData },
      succesMsg: messages.image_package.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Image Package list',
        serviceCall: getAllImagesPackage,
        serviceData: { ...req.query },
        succesMsg: messages.image_package.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { package_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Image Package Detail',
      serviceCall: getImagesPackage,
      serviceData: { package_id, ...req.query },
      succesMsg: messages.image_package.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { package_id }  = req.params;
  const imagePackageData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Image Package',
      serviceCall: updateImagesPackage,
      serviceData: { package_id, imagePackageData },
      succesMsg: messages.image_package.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { package_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Image Package',
      serviceCall: deleteImagesPackage,
      serviceData: { package_id },
      succesMsg: messages.image_package.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
