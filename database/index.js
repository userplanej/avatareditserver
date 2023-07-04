const Sequelize = require('sequelize');
const dotEnv = require('dotenv');

const { successLog, noticeLog, errorLog } = require('../helpers/loggers');

dotEnv.config();

function inititeDatabase() {
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER_NAME,
        process.env.DATABASE_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            logging: noticeLog,
            define: {
                timestamps: false,
            },
        }
    );

    (async function () {
        try {
            await sequelize.authenticate();
            successLog(
                'CONNECTED TO DB :',
                'Connection has been established successfully.'
            );
        } catch (error) {
            errorLog(
                'DB CONNECTION ERROR :',
                'Unable to connect to the database:' + error
            );
        }
    })();

    require('./models')(sequelize);

    require('./associations')(sequelize);

    return sequelize;
}

module.exports = inititeDatabase();
