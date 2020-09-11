const User = require('../models/User');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://amelie:test1234@cluster0.kuvj1.azure.mongodb.net/simplonPdfGen?retryWrites=true&w=majority", 
{useNewUrlParser: true},() =>

console.log("BDD CONNECTER")
);
let controller = {}

/**
 *
 * Formulaire login
 * @param {object} res Express response object render
 * @memberof controller
 */
controller.login = async (req, res) => { //GET:/login
  try {
    res.render('login', {
      title: 'Login',
      path: '/login',
    });
  } catch (error) {
    return res.status(500).send('Error!');
  }
}


/**
 *
 * Formulaire inscription
 * @param {object} res Express response object render
 *
 * @memberof controller
 */
controller.register = async (req, res) => {
  try {
    //console.log(req.session.msgFlash)
    res.render('register', {
      title: 'Register',
      path: '/register',
    });
  } catch (error) {
    return res.status(500).send('Error!');
  }
}


/**
 *
 * Action connexion
 * @param {object} req body
 * @param {object} res json
 *
 * @memberof controller
 */
//to do : login et inscription for admin
controller.signin = async (req, res) => {
  var email=req.body.email
  var password=req.body.password

  if (email=='' || password=='') {
      req.flash("error", "Champs manquante")
      res.redirect('/login')

  } else {
    try {
      const user = await User.findOne({
        email: email
      })
      if (!user || (user.email !== email && user.password !== password)) {
        req.flash("error", "Mauvais identifiants")
        res.redirect('/login')
      } else {
        req.session.user = user;
        // console.log(req.session);
        req.flash("success", "Bienvenue")
        res.redirect('/dashboard')
      }
    } catch (error) {
      req.flash("error", "Un problème est survenus ")
      res.redirect('/login')
    }
  }
  // console.log(req.session)
}


/**
 *
 * Action connexion
 * @param {object} req body
 * @param {object} res redirect /login
 *
 * @memberof controller
 */

controller.signup = (req, res) => {

  const email = req.body.email
  const password = req.body.password

  if (email == '' || password == '') {
    //console.log("boucle if")
    console.log(req.session.msgFlash)
    req.flash("error", "Champs manquant")
    res.redirect('/')
  } else {
    //console.log("else")
    User.create({
      email: email,
      password: password
    }).then(() => {
      req.flash("success", "Inscription réussi")
      res.redirect('/')
    })
  }
}










/**
 * 
 * Indentification du user
 * @param {object} req params
 * @param {object} res status
 * @param {object} :id
 * @memberof controller
 */
controller.show = async (req, res) => {
  const {
    id
  } = req.params
  try {
    const user = await User.findById(id)
    if (!user) return res.status(400).json({
      result: "error",
      message: "utilisateur non trouvé"
    })
    res.status(200).json({
      user
    })
  } catch (error) {
    res.status(400).json({
      result: "error",
      message: error
    })
  }
}

module.exports = controller;




// controller.signup = async (req, res) => {
//   const {
//     email,
//     password
//   } = req.body
//   try {
//     const user = await User.create({
//       email,
//       password
//     })
//     res.status(201).json({
//       user
//     })
//   } catch (error) {
//     res.status(400).json({
//       result: "error"
//     })
//   }
// }