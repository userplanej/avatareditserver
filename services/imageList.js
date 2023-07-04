const { models } = require('../database/index');
const messages = require('../helpers/messages');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const s3 = require('../config/s3');

module.exports.createImage = async (data) => {
    try {
        const { imageData } = data;
        const createNewImage = await models.image_list.create({ ...imageData });
        return createNewImage
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllImages = async (data) => {
    try {
        const page = parseInt(data.page ?? 1);
        const size = parseInt(data.size ?? 10);
        
        const where = {}

        if(data.user_id) {
            where.user_id = data.user_id
        }

        if(data.is_upload) {
            where.is_upload = data.is_upload === 'true' ? true : false
        }

        if(data.image_name) {
            where.image_name = data.image_name
        }

        if(data.image_id) {
            where.image_id = data.image_id
        }

        if (data.startDate && data.endDate) {
            where.create_date = {
              [Op.between]: [new Date(data.startDate).toISOString(), new Date(query.endDate).toISOString()]
            };
        }
        const result = await models.image_list.findAndCountAll({
            where,
            order: [['create_date', 'DESC']],
        });

        const offset = page * size - size;
        let limit = size;
        let images = result.rows;

        limit = offset + limit > images.length ? images.length : limit;
        images = images.slice(offset, limit + offset);
        images = images.map((image) => {
            image = image.toJSON();
            return image;
        });
        return images
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getImage = async (data) => {
    try {
        const { image_id } = data
        const image = await models.image_list.findOne({
            where: {
              image_id
            }
        });
        return image
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateImage = async (data) => {
    try {
        const { image_id, imageData } = data
        const checkId = await models.image_list.findOne({
            where: {
              image_id
            }
        });

        if(!checkId) throw new Error(messages.image_list.IMAGE_NOT_EXISTS);

        const image = await models.image_list.update({ ...imageData },{
            where: {
              image_id
            }
        });
        return image
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteImage = async (data) => {
    try {
        const { image_id } = data
        const checkId = await models.image_list.findOne({
            where: {
              image_id
            }
        });

        if(!checkId) throw new Error(messages.output.IMAGE_NOT_EXISTS);
        const image = await models.image_list.destroy({
            where: {
            image_id
            }
        });
        return image
        // const arr_key = []
        // const location_image_dir = checkId.image_dir
        // if(location_image_dir === null) {
        //     const image = await models.image_list.destroy({
        //         where: {
        //           image_id
        //         }
        //     });
        //     return image
        // }

        // if(location_image_dir !== null) {
        //     const image_dir_split = location_image_dir.split('.com/')
        //     const image_dir_key = { Key: image_dir_split[1] }
        //     arr_key.push(image_dir_key)
            
        //     const params = {
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Delete: {
        //         Objects: arr_key,
        //         Quiet: false
        //     }
        //     };

        //     s3.deleteObjects(params, function (err) {
        //         if (err) console.log(err, err.stack);
        //     });
        //     const image = await models.image_list.destroy({
        //         where: {
        //         image_id
        //         }
        //     });
        //     return image
        // }
    } catch (err) {
        throw new Error(err);
    }
};