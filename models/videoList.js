const { Sequelize, Model } = require('sequelize');

const VideoList = (sequelize) => {
    class VideoListModel extends Model {}
    VideoListModel.init(
      {
        video_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        video_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        video_dir: {
          type: Sequelize.TEXT,
          allowNull: false
        },
      },
      { sequelize,
        modelName: 'video_list',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = VideoList;
