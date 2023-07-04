const { models } = require('../database/index');
const messages = require('../helpers/messages');

module.exports.createImageClip = async (data) => {
    try {
        const { clipData } = data;
        const createNewClip = await models.image_clip.create({ ...clipData });
        return createNewClip
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllImageClip = async (data) => {
    try {
        const where = {}
        if(data.package_id) {
            where.package_id = data.package_id
        }
        const clips = await models.image_clip.findAndCountAll({
            where
        });
        return clips
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getImageClip = async (data) => {
    try {
        const { clip_id } = data
        const clip = await models.image_clip.findOne({
            where: {
              clip_id
            }
        });
        return clip
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateImageClip = async (data) => {
    try {
        const { clip_id, clipData } = data
        const checkId = await models.image_clip.findOne({
            where: {
              clip_id
            }
        });

        if(!checkId) throw new Error(messages.image_clip.CLIP_NOT_EXISTS);

        const clip = await models.image_clip.update({ ...clipData },{
            where: {
              clip_id
            }
        });
        return clip
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteImageClip = async (data) => {
    try {
        const { clip_id } = data
        const checkId = await models.image_clip.findOne({
            where: {
              clip_id
            }
        });

        if(!checkId) throw new Error(messages.image_clip.CLIP_NOT_EXISTS);

        const clip = await models.image_clip.destroy({
            where: {
              clip_id
            }
        });
        return clip
    } catch (err) {
        throw new Error(err);
    }
};