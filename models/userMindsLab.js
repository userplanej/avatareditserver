const { Sequelize, Model } = require('sequelize');

const UserMindsLab = (sequelize) => {
    class UserModel extends Model {}
    UserModel.init(
      {
        user_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        phone: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        verify: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        password_confirm: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        bio: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        company: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        reset_code: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        is_allow: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        reset_time: {
          type: Sequelize.DATE,
        },
        is_admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        activation_code: {
          type: Sequelize.TEXT,
          allowNull: true
        },
      },
      { sequelize,
        modelName: 'user_minds_lab',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = UserMindsLab;
