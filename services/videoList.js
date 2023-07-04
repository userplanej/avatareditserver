const { models } = require('../database/index');
const messages = require('../helpers/messages');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.createVideo = async (data) => {
    try {
        const { videoData } = data;
        const createNewVideo = await models.video_list.create({ ...videoData });
        return createNewVideo
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllVideo = async (query) => {
    try {
        const page = parseInt(query.page ?? 1);
        const size = parseInt(query.size ?? 10);

        const where = {
            video_name: { [Op.like]: `%${query.video_name ?? ''}%` },
            video_id: { [Op.like]: `%${query.video_id ?? ''}%` },
        };

        if (query.startDate && query.endDate) {
            where.create_date = {
              [Op.between]: [new Date(query.startDate).toISOString(), new Date(query.endDate).toISOString()]
            };
        }

        const result = await models.video_list.findAndCountAll({
            where,
            order: [['create_date', 'DESC']],
        });

        const offset = page * size - size;
        let limit = size;
        let videos = result.rows;

        limit = offset + limit > videos.length ? videos.length : limit;
        videos = videos.slice(offset, limit + offset);
        videos = videos.map((video) => {
            video = video.toJSON();
            return video;
        });
        return videos

    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getVideo = async (data) => {
    try {
        const { video_id } = data
        const video = await models.video_list.findOne({
            where: {
              video_id
            }
        });
        return video
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateVideo = async (data) => {
    try {
        const { video_id, videoData } = data
        const checkId = await models.video_list.findOne({
            where: {
              video_id
            }
        });

        if(!checkId) throw new Error(messages.video_list.VIDEO_NOT_EXISTS);

        const video = await models.video_list.update({ ...videoData },{
            where: {
              video_id
            }
        });
        return video
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteVideo = async (data) => {
    try {
        const { video_id } = data
        const checkId = await models.video_list.findOne({
            where: {
              video_id
            }
        });

        if(!checkId) throw new Error(messages.video_list.VIDEO_NOT_EXISTS);

        const video = await models.video_list.destroy({
            where: {
              video_id
            }
        });
        return video
    } catch (err) {
        throw new Error(err);
    }
};