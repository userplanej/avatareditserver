const { Sequelize, Model } = require('sequelize');

const ShapeList = (sequelize) => {
    class ShapeListModel extends Model {}
    ShapeListModel.init(
      {
        shape_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        shape_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        shape_dir: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        shape_thumbnail_dir: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
      },
      { sequelize,
        modelName: 'shape_list',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = ShapeList;
