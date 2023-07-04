const { Sequelize, Model } = require('sequelize');

const ImagePackage = (sequelize) => {
    class ImagePackageModel extends Model {}
    ImagePackageModel.init(
      {
        package_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        clip_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        file_dir: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        package_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        is_draft: {
          type: Sequelize.BOOLEAN,
          defaultValue: null
        },
        is_template: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      },
      { sequelize,
        modelName: 'image_package',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = ImagePackage;
