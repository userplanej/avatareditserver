const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3.js');
const s3MindsLab = require('../controllers/s3MindsLab');

const bucketName = process.env.AWS_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    key(req, file, cb) {
      const fullPath = `${req.query.type}/${file.originalname}`;
      cb(null, fullPath);
    }
  })
});

module.exports = (router) => {
  router.post(
    '/upload',
    upload.array('images', 10),
    s3MindsLab.upload
  );
  router.get(
    '/get',
    s3MindsLab.getAll
  );
  router.delete(
    '/delete',
    s3MindsLab.delete
  );
  router.post(
    '/sendToClientApi',
    s3MindsLab.sendToClientApi
  );
  return router;
};