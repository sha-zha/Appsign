const {PDFDocument} = require('pdf-lib');
const fs = require('fs');
let controller = {};
const path = require('path');

const Template = require('../models/Template');
/**
 *
 * @param {object} req Express request object
 * @param {object} res Express response object render
 *
 * @memberof controller
 */
controller.index = async (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/')
	}
	Template.find().then((templates) => {
		res.render('templates/index', {
			title: 'Créer un template',
			templates: templates
		})
	})
	.catch((error) => {
		throw error
	})
}

controller.signPdf = async (req, res, next) =>{
	//recuperation des parametres dans url 
	var pdf= req.params.url
	var row= req.params.row
	var nbrow= req.params.nbrow
	let day = req.params.day

	// récupération du chemin par le parammetre de lien
	const list= await PDFDocument.load(fs.readFileSync('docs/'+pdf));

	// Cree un nouveau document
	const doc = await PDFDocument.create();

	// Add the cover to the new doc
	const [listPage] = await doc.copyPages(list, [0]);
	doc.addPage(listPage);
  let img = fs.readFileSync('public/images/logo.png');
  img = await doc.embedPng(img);

	//Selection de la page a modifier
	const pages = doc.getPages()
  const firstPage = pages[0]
	var z=438;
	nbrow=nbrow+1
	//Enclenché signature en fonction de la ligne
	for (let index = 1; index < nbrow; index++) {
		if(row==index){

			switch (day){
				case '0' :
				firstPage.drawImage(img, {
				  x: 235,
				  y: z,
				  width:25,
				  height:25,
				});
				break;

				case '1' :
				firstPage.drawImage(img, {
				  x: 335,
				  y: z,
				  width:25,
				  height:25,
				});
				break;

				case '2' :

				firstPage.drawImage(img, {
				  x: 435,
				  y: z,
				  width:25,
				  height:25,
				});
				break;

				case '3' :
				firstPage.drawImage(img, {
				  x: 535,
				  y: z,
				  width:25,
				  height:25,
				});
				break;

				case '4' :
				firstPage.drawImage(img, {
				  x: 635,
				  y: z,
				  width:25,
				  height:25,
				});
				break;

				case '5' :
				firstPage.drawImage(img, {
				  x: 735,
				  y: z,
				  width:25,
				  height:25,
				});
				break;

				case '6' :
				firstPage.drawImage(img, {
				  x: 835,
				  y: z,
				  width:25,
				  height:25,
				});
				break;


			}


		  console.log(index)
		  console.log(z)
		  console.log(day)
		}
		z-=30;
 	}

	  // Enregistrer le pdf
	  fs.writeFileSync('docs/'+ pdf, await doc.save());
}

controller.add = async (req, res, next) => {
	res.render('templates/add', {
		title: "Création template"
	});
}

/**
 *
 * @param {object} req Express request object file
 * @param {object} res Express response object
 *
 * @memberof controller
 */

controller.create = async (req, res, next) => { //POST:/create
	const logoFile = req.file;
	//enregistre le chemin de l'image sans le public/images
	const logo = logoFile.path.split('public/images/')[1];
	console.log(req.file);
	//to do : validation des données du formulaire avec express validator
	try {
		const template = new Template({
			name: req.body.name,
			entitled: req.body.entitled,
			organism: req.body.organism,
			logo: logoFile.filename
		});

		if (template.name==''||template.entitled==''||template.organism==''||template.logo=='') {
			req.flash("error", "Champs manquante")
			res.redirect('/templates/add')


		}else{

			await template.save().then(() => {
				
			req.flash("success", "Le template a bien été créé")
			res.redirect('/templates/add')

		})
		}
		
	} catch (error) {
		req.flash("error", "Une erreur est survenue lors de la création du template")
		res.redirect('/templates/add')
		
	}
}

controller.show = async (req, res, next) => {
	const templateID = req.params.id;

	Template.findById(templateID)
		.then((template) => {
			res.render('templates/show', {
				template: template
			})
		})
}

/**
 *
 * @param {object} req Express request object file
 * @param {object} res Express response object
 *
 * @memberof controller
 *Chemin vers formulaire
 */

controller.edit = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/')
  }
  const id = req.params.id;
  const edit = await Template.findOne({_id : id})
  res.render('edit', {title: 'Edit', edit : edit })
}

controller.update = async (req, res, next) => { //POST:/update
	const logoFile = req.file;
	const id = req.params.id;

	if(logoFile != undefined){
		//enregistre le chemin de l'image sans le public/images
		const logo = logoFile.path.split('public/images/')[1];
		try {
			//update des données avec image
		  Template.findByIdAndUpdate ({
          _id : id
        },
		    {
          name: req.body.name,
		      entitled: req.body.entitled,
			    organism: req.body.organism,
			    logo : logoFile.filename
			  },
		    function ( err , result ) {
		      if ( err ) {
		        console.log(err);
		      } else {
		        res.send(result ) ;
		      }
		    });
		} catch (error) {
				res.json({
					success: false,
					message: 'Une erreur est survenue lors de l\'éditon du template'
				});
		}
} else {
	  try {
			//update des données sans image
		  Template.findByIdAndUpdate ({
        _id : id
      },
		  {
        name: req.body.name,
		    entitled: req.body.entitled,
			  organism: req.body.organism
			} ,
		  function ( err , result ) {
		    if ( err ) {
		      console.log(err);
		    } else {
		      res.send(result ) ;
		    }
		  });
		} catch (error) {
				res.json({
					success: false,
					message: 'Une erreur est survenue lors de l\'éditon du template'
		  });
		}
	}
}

module.exports = controller;