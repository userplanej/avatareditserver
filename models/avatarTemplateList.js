const { Sequelize, Model } = require('sequelize');

const AvatarTemplateList = (sequelize) => {
    class AvatarTemplateListModel extends Model {}
    AvatarTemplateListModel.init(
      {
        avatar_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        avatar_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        avatar_dir: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        avatar_thumbnail_dir: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        voices: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        scale: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        avatar_video_dir: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        uploaded_by: {
          type: Sequelize.TEXT,
          defaultValue: null
        }
      },
      { sequelize,
        modelName: 'avatar_template_list',
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = AvatarTemplateList;
