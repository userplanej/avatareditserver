const { Sequelize, Model } = require('sequelize');

const Output = (sequelize) => {
    class OutputModel extends Model {}
    OutputModel.init(
      {
        output_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        video_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        video_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        video_dir: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          defaultValue: null
        }
      },
      { sequelize,
        modelName: 'output',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = Output;
