const express = require('express');
const router = express.Router();
const controller = require('../controllers/post') 
const multer = require('multer');
const path = require('path');
const uuid = require('uuid')

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '..', 'uploads/'))
     },
     filename: function (req, file, cb) {
       cb(null, uuid.v4() + path.extname(file.originalname))
     }
 })
 
 const upload = multer({ storage })

router

     .get('/data', controller.GET)
     .get('/download/:id', controller.DOWN)
     .post('/data', upload.fields([{name: 'pasport', maxCount: 1}, {name: 'rasm', maxCount: 1},{name: 'diplom', maxCount: 1},{name: 'inn', maxCount: 1},{name: 'buyruq', maxCount: 1},{name: 'unvon', maxCount: 1}]), controller.postData)


module.exports = router;