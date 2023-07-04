const { models } = require('../database/index');
const messages = require('../helpers/messages');
const s3 = require('../config/s3');

module.exports.createAvatarTemplate = async (data) => {
    try {
        const { avatarTemplateData } = data;
        const createNewAvatarTemplate = await models.avatar_template_list.create({ ...avatarTemplateData });
        return createNewAvatarTemplate
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllAvatarTemplate = async () => {
    try {
        const avatarTemplates = await models.avatar_template_list.findAndCountAll();
        return avatarTemplates
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAvatarTemplate = async (data) => {
    try {
        const { avatar_id } = data
        const avatarTemplate = await models.avatar_template_list.findOne({
            where: {
              avatar_id
            }
        });
        return avatarTemplate
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateAvatarTemplate = async (data) => {
    try {
        const { avatar_id, avatarTemplateData } = data
        const checkId = await models.avatar_template_list.findOne({
            where: {
              avatar_id
            }
        });

        if(!checkId) throw new Error(messages.avatar_template_list.AVATAR_TEMPLATE_NOT_EXISTS);

        const avatarTemplate = await models.avatar_template_list.update({ ...avatarTemplateData },{
            where: {
              avatar_id
            }
        });
        return avatarTemplate
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteAvatarTemplate = async (data) => {
    try {
        const { avatar_id } = data
        const checkId = await models.avatar_template_list.findOne({
            where: {
              avatar_id
            }
        });

        if(!checkId) throw new Error(messages.avatar_template_list.AVATAR_TEMPLATE_NOT_EXISTS);
        const avatarTemplate = await models.avatar_template_list.destroy({
            where: {
              avatar_id
            }
        });
        return avatarTemplate
        // const arr_key = []
        // const location_avatar_dir = checkId.avatar_dir
        // const location_avatar_thumbnail_dir = checkId.avatar_thumbnail_dir
        // const avatar_dir_split = location_avatar_dir.split('.com/')
        // const avatar_dir_key = { Key: avatar_dir_split[1] }
        // arr_key.push(avatar_dir_key)

        // if(location_avatar_thumbnail_dir !== null) {
        //     const avatar_dir_split = location_avatar_thumbnail_dir.split('.com/')
        //     const avatar_thumbnail_dir_key = { Key: avatar_dir_split[1] }
        //     arr_key.push(avatar_thumbnail_dir_key)
        // }

        // const params = {
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Delete: {
        //         Objects: arr_key,
        //         Quiet: false
        //     }
        //   };
          
        // s3.deleteObjects(params, function (err) {
        //     if (err) console.log(err, err.stack);
        // });
        // const avatarTemplate = await models.avatar_template_list.destroy({
        //     where: {
        //       avatar_id
        //     }
        // });
        // return avatarTemplate
    } catch (err) {
        throw new Error(err);
    }
};