const { models } = require('../database/index');
const messages = require('../helpers/messages');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const s3 = require('../config/s3');

module.exports.createBackground = async (data) => {
    try {
        const { backgroundData } = data;
        const createNewBackground = await models.background.create({ ...backgroundData });
        return createNewBackground
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.getAllBackgrounds = async (query) => {
  try {
    let { user_id, is_upload } = query
    const where= {}
    if(user_id) {
        user_id = parseInt(user_id)
        where.user_id = user_id
    }

    if(is_upload) {
        is_upload = (is_upload.toLowerCase() === 'true')
        where.is_upload = is_upload
    }
    const backgrounds = await models.background.findAndCountAll({
        where,
        include: [
        {
            model: models.user_minds_lab,
            attributes: ['email', 'name']
        }
        ]
      });
      return backgrounds
  } catch (err) {
      throw new Error(err);
  }
};

module.exports.getBackground = async (data) => {
    try {
        const { background_id } = data
        const background = await models.background.findOne({
            where: {
              background_id
            }
        });
        return background
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.updateBackground = async (data) => {
    try {
        const { background_id, backgroundData } = data
        const checkId = await models.background.findOne({
            where: {
              background_id
            }
        });

        if(!checkId) throw new Error(messages.background.BACKGROUND_NOT_EXISTS);

        const background = await models.background.update({ ...backgroundData },{
            where: {
              background_id
            }
        });
        return background
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteBackground = async (data) => {
    try {
        const { background_id } = data
        const checkId = await models.background.findOne({
            where: {
              background_id
            }
        });

        if(!checkId) throw new Error(messages.output.IMAGE_NOT_EXISTS);
        const background = await models.background.destroy({
            where: {
                background_id
            }
        });
        return background
        // const arr_key = []
        // const location_background_src = checkId.background_src
        
        // if(location_background_src === null) {
        //     const background = await models.background.destroy({
        //         where: {
        //           background_id
        //         }
        //     });
        //     return background
        // }

        // if(location_background_src !== null) {

        //     const background_src_split = location_background_src.split('.com/')
        //     const background_src_key = { Key: background_src_split[1] }
        //     arr_key.push(background_src_key)
            
        //     const params = {
        //         Bucket: process.env.AWS_BUCKET_NAME,
        //         Delete: {
        //             Objects: arr_key,
        //             Quiet: false
        //             }
        //     };

        //     s3.deleteObjects(params, function (err) {
        //         if (err) console.log(err, err.stack);
        //     });
            
        //     const background = await models.background.destroy({
        //         where: {
        //             background_id
        //         }
        //     });
        //     return background
        // }
    } catch (err) {
        throw new Error(err);
    }
};