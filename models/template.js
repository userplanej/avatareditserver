const { Sequelize, Model } = require('sequelize');

const Template = (sequelize) => {
    class TemplateModel extends Model {}
    TemplateModel.init(
      {
        template_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        template_name: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
        template_object: {
          type: Sequelize.TEXT,
          defaultValue: null
        },
      },
      { sequelize,
        modelName: 'template',
        timestamps:true,
        createdAt: 'create_date',
        updatedAt: 'update_date'
      }
    );
};

module.exports = Template;
