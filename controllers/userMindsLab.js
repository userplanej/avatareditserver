const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  userSignIn,
  sendResetCode,
  checkCode,
  newPassword } = require('../services/userMindsLab');

module.exports.create = async (req, res) => {
  const userMindsLabData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create User Mindslab',
      serviceCall: createUser,
      serviceData: { userMindsLabData },
      succesMsg: messages.user_minds_lab.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get User Mindslab list',
        serviceCall: getAllUser,
        serviceData: { ...req.query },
        succesMsg: messages.user_minds_lab.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { user_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get User Mindslab Detail',
      serviceCall: getUser,
      serviceData: { user_id, ...req.query },
      succesMsg: messages.user_minds_lab.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { user_id }  = req.params;
  const userMindsLabData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update User Mindslab',
      serviceCall: updateUser,
      serviceData: { user_id, userMindsLabData },
      succesMsg: messages.user_minds_lab.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { user_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete User Mindslab',
      serviceCall: deleteUser,
      serviceData: { user_id },
      succesMsg: messages.user_minds_lab.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.signIn = async (req, res) => {
  const userMindsLabData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create User Mindslab',
      serviceCall: userSignIn,
      serviceData: { userMindsLabData },
      succesMsg: messages.user_minds_lab.SIGN_IN_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.sendResetCode = async (req, res) => {
  const userMindsLabData = req.body
  const response = await controllerBuilder({
      controllerName: 'Send Reset Code for Forget Password',
      serviceCall: sendResetCode,
      serviceData: { userMindsLabData },
      succesMsg: messages.user_minds_lab.SEND_RESET_CODE,
  });

  return res.status(response.status).send(response);
};

module.exports.checkCode = async (req, res) => {
  const userMindsLabData = req.body
  const response = await controllerBuilder({
      controllerName: 'Check Reset Code for Forget Password',
      serviceCall: checkCode,
      serviceData: { userMindsLabData },
      succesMsg: messages.user_minds_lab.CODE_ACCEPTED,
  });

  return res.status(response.status).send(response);
};


module.exports.newPassword = async (req, res) => {
  const userMindsLabData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create new Password',
      serviceCall: newPassword,
      serviceData: { userMindsLabData },
      succesMsg: messages.user_minds_lab.NEW_PASSWORD_SUCCESS,
  });

  return res.status(response.status).send(response);
};
