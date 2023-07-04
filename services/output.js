const { models } = require('../database/index');
const messages = require('../helpers/messages');

module.exports.createOutput = async (data) => {
    try {
        const { outputData } = data;
        const createNewOutput = await models.output.create({ ...outputData });
        return createNewOutput
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllOutputs = async (data) => {
    try {
        const where = {}
        if(data.video_id) {
            where.video_id = data.video_id
        }
        const outputs = await models.output.findAndCountAll({
            where
        });
        return outputs
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getOutput = async (data) => {
    try {
        const { output_id } = data
        const output = await models.output.findOne({
            where: {
              output_id
            }
        });
        return output
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateOutput = async (data) => {
    try {
        const { output_id, outputData } = data
        const checkId = await models.output.findOne({
            where: {
              output_id
            }
        });

        if(!checkId) throw new Error(messages.output.VIDEO_NOT_EXISTS);

        const output = await models.output.update({ ...outputData },{
            where: {
              output_id
            }
        });
        return output
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteOutput = async (data) => {
    try {
        const { output_id } = data
        const checkId = await models.output.findOne({
            where: {
              output_id
            }
        });

        if(!checkId) throw new Error(messages.output.VIDEO_NOT_EXISTS);

        const output = await models.output.destroy({
            where: {
              output_id
            }
        });
        return output
    } catch (err) {
        throw new Error(err);
    }
};