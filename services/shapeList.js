const { models } = require('../database/index');
const messages = require('../helpers/messages');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const s3 = require('../config/s3');

module.exports.createShape = async (data) => {
    try {
        const { shapeData } = data;
        const createNewShape = await models.shape_list.create({ ...shapeData });
        return createNewShape
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllShape = async (query) => {
    try {
        const page = parseInt(query.page ?? 1);
        const size = parseInt(query.size ?? 10);

        const where = {
            shape_name: { [Op.like]: `%${query.shape_name ?? ''}%` },
            shape_id: { [Op.like]: `%${query.shape_id ?? ''}%` },
        };

        if (query.startDate && query.endDate) {
            where.create_date = {
              [Op.between]: [new Date(query.startDate).toISOString(), new Date(query.endDate).toISOString()]
            };
        }
        const result = await models.shape_list.findAndCountAll({
            where,
            order: [['create_date', 'DESC']],
        });

        const offset = page * size - size;
        let limit = size;
        let shapes = result.rows;

        limit = offset + limit > shapes.length ? shapes.length : limit;
        shapes = shapes.slice(offset, limit + offset);
        shapes = shapes.map((shape) => {
            shape = shape.toJSON();
            return shape;
        });
        return shapes
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getShape = async (data) => {
    try {
        const { shape_id } = data
        const shape = await models.shape_list.findOne({
            where: {
              shape_id
            }
        });
        return shape
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateShape = async (data) => {
    try {
        const { shape_id, shapeData } = data
        const checkId = await models.shape_list.findOne({
            where: {
              shape_id
            }
        });

        if(!checkId) throw new Error(messages.shape_list.SHAPE_NOT_EXISTS);

        const shape = await models.shape_list.update({ ...shapeData },{
            where: {
              shape_id
            }
        });
        return shape
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteShape = async (data) => {
    try {
        const { shape_id } = data
        const checkId = await models.shape_list.findOne({
            where: {
              shape_id
            }
        });

        if(!checkId) throw new Error(messages.shape_list.SHAPE_NOT_EXISTS);
        const shape = await models.shape_list.destroy({
            where: {
              shape_id
            }
        });
        return shape
        // const arr_key = []
        // const location_shape_dir = checkId.shape_dir
        // const location_shape_thumbnail_dir = checkId.shape_thumbnail_dir
        // const shape_dir_split = location_shape_dir.split('.com/')
        // const shape_dir_key = { Key: shape_dir_split[1] }
        // arr_key.push(shape_dir_key)
        
        // if(location_shape_thumbnail_dir !== null) {
        //     const shape_dir_split = location_shape_thumbnail_dir.split('.com/')
        //     const shape_thumbnail_dir_key = { Key: shape_dir_split[1] }
        //     arr_key.push(shape_thumbnail_dir_key)
        // }

        // const params = {
        //   Bucket: process.env.AWS_BUCKET_NAME,
        //   Delete: {
        //       Objects: arr_key,
        //       Quiet: false
        //   }
        // };

        // s3.deleteObjects(params, function (err) {
        //     if (err) console.log(err, err.stack);
        // });
        // const shape = await models.shape_list.destroy({
        //     where: {
        //       shape_id
        //     }
        // });
        // return shape
    } catch (err) {
        throw new Error(err);
    }
};