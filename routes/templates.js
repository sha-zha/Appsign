const express = require('express');
const router = express.Router();
const multer  =   require('multer');
const controller = require('../controllers/templatesController')
const fs = require('fs-extra');
const path = require('path');

/**
 * @request GET
 * @controller index
 * Liste templates
 * 
 */
router.get('/list', controller.index);
/**
 * @request GET
 * @controller add
 * Formulaire create template
 *
 */
router.get('/add', controller.add);

/**
 * @request POST
 * @controller create
 * Action upload le logo(signature)
 *
 */

//upload l'image dans le dossier public/images
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //mkdirs est une fonction de fs-extra qui autorise l'enregistrement du fichier même si le dossier existe déjà
    fs.mkdirs('./public/images', function(err) {
        if(err) {
            console.log(err.stack)
        } else {
            callback(null, './public/images');
        }
    })
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage : storage }).single('logo');

router.post('/create', upload, controller.create);
router.get('/edit/:id',controller.edit);
router.post('/update/:id',upload,controller.update);

router.get('/show/:id', controller.show);

module.exports = router;