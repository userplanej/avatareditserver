const { models } = require('../database/index');
const messages = require('../helpers/messages');

module.exports.createOrganization = async (data) => {
    try {
        const { organizationData } = data;
        const checkName = await models.organization.findOne({
            where: {
                organization_name: organizationData.organization_name
            }
        })
        
        if (checkName) throw new Error(messages.organization.ORGANIZATION_EXISTS);
        
        const createNewOrg = await models.organization.create({ ...organizationData });
        return createNewOrg
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllOrganizations = async () => {
    try {
        const organizations = await models.organization.findAndCountAll();
        return organizations
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getOrganization = async (data) => {
    try {
        const { organization_id } = data
        const organization = await models.organization.findOne({
            where: {
                organization_id
            }
        });
        return organization
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateOrganization = async (data) => {
    try {
        const { organization_id, organizationData } = data
        const checkId = await models.organization.findOne({
            where: {
                organization_id
            }
        });

        if(!checkId) throw new Error(messages.organization.ORGANIZATION_NOT_EXISTS);

        const organization = await models.organization.update({ ...organizationData },{
            where: {
                organization_id
            }
        });
        return organization
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteOrganization = async (data) => {
    try {
        const { organization_id } = data
        const checkId = await models.organization.findOne({
            where: {
                organization_id
            }
        });

        if(!checkId) throw new Error(messages.organization.ORGANIZATION_NOT_EXISTS);

        const organization = await models.organization.destroy({
            where: {
                organization_id
            }
        });
        return organization
    } catch (err) {
        throw new Error(err);
    }
};