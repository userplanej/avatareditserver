const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const SessionStore = require('express-session-sequelize')(session.Store);

const sequelize = require('./database/index');

const initiateRouter = require('./routes/index');
const { isAuthenticated } = require('./middlewares/authentication');
const { errorLog } = require('./helpers/loggers');

const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});

function initiateApp() {
    const app = express();
    console.log("-----------1----------------------");
    // cors
    app.use(cors());
    // cookie parser
    app.use(cookieParser());
    app.use('/uploads', express.static('./uploads'));
    console.log("-----------2----------------------");
    // request payload middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    ///Set session and cookie max life, store session in mongo database
    app.use(
        session({
            secret: process.env.SECRET_KEY,
            resave: true,
            saveUninitialized: false,
            store: sequelizeSessionStore,
            cookie: { maxAge: 60 * 60 * 1000 },
        })
    );
    console.log("-----------3----------------------");
    Object.defineProperty(Array.prototype, 'flat', {
        value: function (depth = 1) {
            return this.reduce(function (flat, toFlatten) {
                return flat.concat(
                    Array.isArray(toFlatten) && depth > 1
                        ? toFlatten.flat(depth - 1)
                        : toFlatten
                );
            }, []);
        },
    });
    console.log("-----------4----------------------");
    //initialize passport
    // app.use(passport.initialize());
    // app.use(passport.session());
    // require('./middlewares/passport')(passport);

    // //check if user authenticated
    // app.use(isAuthenticated());

    // error handler middleware
    app.use(function (err, req, res, next) {
        errorLog('SERVER ERROR: ', err.stack);
        res.status(500).send({
            status: 500,
            message: err.message,
            body: {},
        });
    });

    initiateRouter(app, express.Router());

    return app;
}

module.exports = initiateApp();
