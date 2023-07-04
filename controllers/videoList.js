const messages = require('../helpers/messages');
const controllerBuilder = require('../helpers/utils');

const {
  createVideo,
  getAllVideo,
  getVideo,
  updateVideo,
  deleteVideo } = require('../services/videoList');

module.exports.create = async (req, res) => {
  const videoData = req.body
  const response = await controllerBuilder({
      controllerName: 'Create Video',
      serviceCall: createVideo,
      serviceData: { videoData },
      succesMsg: messages.video_list.CREATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const response = await controllerBuilder({
        controllerName: 'Get Video list',
        serviceCall: getAllVideo,
        serviceData: { ...req.query },
        succesMsg: messages.video_list.RETRIEVES_SUCCESS,
    });

    return res.status(response.status).send(response);
};

module.exports.getDetail = async (req, res) => {
  const { video_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Get Video Detail',
      serviceCall: getVideo,
      serviceData: { video_id, ...req.query },
      succesMsg: messages.video_list.RETRIEVE_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.update = async (req, res) => {
  const { video_id }  = req.params;
  const videoData = req.body
  const response = await controllerBuilder({
      controllerName: 'Update Video',
      serviceCall: updateVideo,
      serviceData: { video_id, videoData },
      succesMsg: messages.video_list.UPDATED_SUCCESS,
  });

  return res.status(response.status).send(response);
};

module.exports.delete = async (req, res) => {
  const { video_id }  = req.params;
  const response = await controllerBuilder({
      controllerName: 'Delete Video',
      serviceCall: deleteVideo,
      serviceData: { video_id },
      succesMsg: messages.video_list.DELETED_SUCCESS,
  });

  return res.status(response.status).send(response);
};
