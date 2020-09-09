const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const templatesController = require('../controllers/templatesController');
const usersController = require('../controllers/usersController');
const indexController = require('../controllers/indexController');

const { formatters } = require('debug');

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Sheets' });
});

router.get('/logout', indexController.logout);

/**
 * @request GET
 * @controller register
 * Home page + formulaire login
 *
 */
router.get('/', usersController.register);
/**
 * @request POST
 * @controller signup
 * Action register
 *
 */
router.post('/signup', usersController.signup)

/**
 * @request GET
 * @controller login
 * Formulaire login
 *
 */
router.get('/login', usersController.login);

/**
 * @request POST
 * @controller signin
 * Action du login
 *
 */
router.post('/signin', usersController.signin);

/**
 * @request GET
 * @controller dashboard
 * Apres connexion vue dashboard
 *
 */
router.get('/dashboard', pdfController.dashboard);
router.get('/sign/:url/:row/:nbrow', templatesController.signPdf);

/**
 * @request POST
 * @controller createPdf
 * Action du création du pdf
 *
 */
router.post('/createpdf', pdfController.createPdf);

router.get('/createpdf/:id', pdfController.createPdf2);


/**
 * @request POST
 * @controller dataSheets
 * Action du génération du pdf
 *
 */
router.post('/data', pdfController.dataSheets);

/**
 * @request GET
 * @controller show
 *
 *
 */
router.get('/:id', usersController.show);

module.exports = router;
