module.exports = (sequelize) => {
    const {
        image_clip,
        image_package,
        user_minds_lab,
        output,
        background
    } = sequelize.models;

    user_minds_lab.hasMany(image_package, { foreignKey: 'user_id' });
    image_package.belongsTo(user_minds_lab, { foreignKey: 'user_id' });

    image_package.hasMany(image_clip, { foreignKey: 'package_id' });
    image_clip.belongsTo(image_package, { foreignKey: 'package_id' });

    image_package.hasOne(output, { foreignKey: 'video_id' });

    user_minds_lab.hasMany(background, { foreignKey: 'user_id' });
    background.belongsTo(user_minds_lab, { foreignKey: 'user_id' });
};
