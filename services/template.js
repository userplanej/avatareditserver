const { models } = require('../database/index');
const messages = require('../helpers/messages');

module.exports.createTemplate = async (data) => {
    try {
        const { templateData } = data;
        if(!templateData.template_name || templateData.template_name === '') throw new Error(messages.template.TEMPLATE_NAME_EMPTY);
        const createNewTemplate = await models.template.create({ ...templateData });
        return createNewTemplate
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllTemplates = async () => {
    try {
        const templates = await models.template.findAndCountAll();
        return templates
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getTemplate = async (data) => {
    try {
        const { template_id } = data
        const template = await models.template.findOne({
            where: {
              template_id
            }
        });
        return template
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateTemplate = async (data) => {
    try {
        const { template_id, templateData } = data
        const checkId = await models.template.findOne({
            where: {
                template_id
            }
        });

        if(!checkId) throw new Error(messages.template.TEMPLATE_NOT_EXISTS);

        const template = await models.template.update({ ...templateData },{
            where: {
                template_id
            }
        });
        return template
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteTemplate = async (data) => {
    try {
        const { template_id } = data
        const checkId = await models.template.findOne({
            where: {
                template_id
            }
        });

        if(!checkId) throw new Error(messages.template.TEMPLATE_NOT_EXISTS);

        const template = await models.template.destroy({
            where: {
                template_id
            }
        });
        return template
    } catch (err) {
        throw new Error(err);
    }
};