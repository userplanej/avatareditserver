const { Sequelize, Model } = require('sequelize');

const ImageList = (sequelize) => {
    class ImageListModel extends Model {}
    ImageListModel.init(
      {
        image_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        image_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        image_dir: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        is_upload:{
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        user_id:{
          type: Sequelize.INTEGER,
          defaultValue: null
        }
      },
      { sequelize,
        modelName: 'image_list',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = ImageList;
