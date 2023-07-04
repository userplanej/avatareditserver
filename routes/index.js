const express = require('express');
const organizationRoutes = require('./organization');
const outputRoutes = require('./output');
const imageListRoutes = require('./imageList');
const imagePackageRoutes = require('./imagePackage');
const shapeListRoutes = require('./shapeList');
const videoListRoutes = require('./videoList');
const imageClipRoutes = require('./imageClip');
const avatarTemplateRoutes = require('./avatarTemplateList');
const userMindsLabRoutes = require('./userMindsLab');
const s3MindsLabRoutes = require('./s3MindsLab');
const textToSpeechRoutes = require('./textToSpeech');
const backgroundRoutes = require('./background')
const templateRoutes = require('./template')

module.exports = (app) => {
    const routes = [
        {
            basePath: `${process.env.BASE_PATH}/organization`,
            routes: organizationRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/output`,
            routes: outputRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/imageList`,
            routes: imageListRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/imagePackage`,
            routes: imagePackageRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/shapeList`,
            routes: shapeListRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/videoList`,
            routes: videoListRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/imageClip`,
            routes: imageClipRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/avatarTemplate`,
            routes: avatarTemplateRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/userMindsLab`,
            routes: userMindsLabRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/s3MindsLab`,
            routes: s3MindsLabRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/texttospeech`,
            routes: textToSpeechRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/background`,
            routes: backgroundRoutes,
        },
        {
            basePath: `${process.env.BASE_PATH}/template`,
            routes: templateRoutes,
        }
    ];

    for (const route of routes) {
        app.use(route.basePath, route.routes(express.Router()));
    }
};
