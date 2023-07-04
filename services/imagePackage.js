const { models } = require('../database/index');
const messages = require('../helpers/messages');

module.exports.createImagePackage = async (data) => {
    try {
        const { imagePackageData } = data;
        const createNewImagePackage = await models.image_package.create({ ...imagePackageData });
        return createNewImagePackage
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllImagesPackage = async (query) => {
    try {
        let { user_id, recent, is_template } = query
        const where = {}
        let size = 100
        if(user_id) {
            where.user_id = user_id
        }
        if(recent === 'true') {
            size = 10
        }
        if(is_template) {
            is_template = (is_template.toLowerCase() === 'true')
            where.is_template = is_template
        }
        const imagesPackage = await models.image_package.findAndCountAll({
            where,
            order: [['update_date', 'DESC']],
            include: [
                {
                    model: models.user_minds_lab,
                    attributes: ['email', 'name']
                },
                {
                    model: models.image_clip,
                    attributes: ['clip_id','clip_name','background_type', 'html5_script', 'html5_dir', 'text_script', 'avatar_pose', 'avatar_type', 'clip_order', 'avatar_size']
                },
                {
                    model: models.output,
                    attributes: ['output_id','video_id','video_name', 'video_dir', 'description']
                },
            ],
            limit: size
        });
        return imagesPackage
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getImagesPackage = async (data) => {
    try {
        const { package_id } = data
        const imagePackage = await models.image_package.findOne({
            where: {
              package_id
            },
            order: [['update_date', 'DESC']],
            include: [
                {
                    model: models.user_minds_lab,
                    attributes: ['email', 'name']
                },
                {
                    model: models.image_clip,
                    attributes: ['clip_id','clip_name','background_type', 'html5_script', 'html5_dir', 'text_script', 'avatar_pose', 'avatar_type', 'clip_order', 'avatar_size']
                },
                {
                    model: models.output,
                    attributes: ['output_id','video_id','video_name', 'video_dir', 'description']
                },
            ],
        });
        return imagePackage
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateImagesPackage = async (data) => {
    try {
        const { package_id, imagePackageData } = data
        const checkId = await models.image_package.findOne({
            where: {
              package_id
            }
        });

        if(!checkId) throw new Error(messages.image_package.PACKAGE_NOT_EXISTS);

        const imagePackage = await models.image_package.update({ ...imagePackageData },{
            where: {
              package_id
            }
        });
        return imagePackage
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteImagesPackage = async (data) => {
    try {
        const { package_id } = data
        const checkId = await models.image_package.findOne({
            where: {
              package_id
            }
        });

        if(!checkId) throw new Error(messages.image_package.PACKAGE_NOT_EXISTS);

        await models.image_package.destroy({
            where: {
              package_id
            }
        });

        await models.image_clip.destroy({
            where: {
              package_id
            }
        });

        return
    } catch (err) {
        throw new Error(err);
    }
};