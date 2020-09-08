const hooks = require('./uploads.hooks');

const blobService = require('feathers-blob');
// Multer is a node.js middleware for handling multipart/form-data,
// which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
// NOTE: Multer will not process any form which is not multipart (multipart/form-data).
const multer = require('multer');
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');


module.exports = function (app) {

  const multipartMiddleware = multer({
    limits: { fieldSize: 25.60001 * 1024 * 1024 }
  });

  app.use('/uploads',
    multipartMiddleware.single('uri'),
    function (req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    blobService({Model: blobStorage})
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads');

  service.hooks(hooks);
};
