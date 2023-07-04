const { Sequelize, Model } = require('sequelize');

const Background = (sequelize) => {
    class BackgroundModel extends Model {}
    BackgroundModel.init(
      {
        background_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        background_name: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        color_hex: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        background_src: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        is_upload: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
      },
      { sequelize,
        modelName: 'background',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = Background;
