module.exports = (sequelize) => {
    const modelDefiners = [
        require('../models/organization'),
        require('../models/output'),
        require('../models/imageList'),
        require('../models/imagePackage'),
        require('../models/shapeList'),
        require('../models/videoList'),
        require('../models/imageClip'),
        require('../models/avatarTemplateList'),
        require('../models/userMindsLab'),
        require('../models/background'),
        require('../models/template'),
    ];

    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }
};
