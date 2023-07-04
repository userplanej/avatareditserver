const { Sequelize, Model } = require('sequelize');

const ImageClip = (sequelize) => {
    class ImageClipModel extends Model {}
    ImageClipModel.init(
      {
        clip_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        package_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        background_type: {
          type: Sequelize.ENUM,
          values: ['video', 'image', 'color', 'null'],
          allowNull: true
        },
        html5_script: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        html5_dir: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        clip_name: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        text_script: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        avatar_pose: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        avatar_type: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        clip_order: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        avatar_size: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
      },
      { sequelize,
        modelName: 'image_clip',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = ImageClip;
