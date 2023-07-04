const dotEnv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require ('swagger-jsdoc');
const path = require ('path');
const components = require ('./docs/components');
const YAML = require('yamljs');

const app = require('./app');
const sequelize = require('./database/index');

const { successLog } = require('./helpers/loggers');

dotEnv.config();

global.__basedir = __dirname;

const PORT = process.env.PORT || 5000;
// API Documentation
if (process.env.NODE_ENV != 'production') {
    console.log("-----------reached----------------")
    let swaggerDefinition = {
        openapi: '3.0.0',
        info: {
          title: 'Mindslab',
          version: '1.0.0',
          description: 'Mindslab',
          logo: {
            url: ''
          }
        },
        servers: [
          {
            url: `/api/v1`
          }
        ],
        host: 'localhost',
        basePath: '/api/v1',
        security: {
          bearerAuth: []
        }
    }

    swaggerDefinition = Object.assign(swaggerDefinition, components);

    const options = {
        swaggerDefinition,
        apis: [path.join(__dirname, '/docs/*.yaml')]
    };
    console.log('apis : ', options.apis)
    
    const swaggerSpec = swaggerJSDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

sequelize.sync(/* { force: true } */).then(() => {
    app.listen(PORT, () => {
        successLog('PORT OPENED : ', `Server listening on port ${PORT}`);
    });
});
