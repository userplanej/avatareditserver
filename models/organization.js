const { Sequelize, Model } = require('sequelize');

const Organization = (sequelize) => {
    class OrganizationModel extends Model {}
    OrganizationModel.init(
        {
          organization_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          organization_name: {
            type: Sequelize.TEXT,
            allowNull: false
          }
        },
        { sequelize,
          modelName: 'organization',
          timestamps:true,
          createdAt: 'create_date',
          updatedAt: 'update_date'
        }
    );
};

module.exports = Organization;
