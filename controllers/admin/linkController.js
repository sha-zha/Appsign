const Sheets = require('../../models/Sheets');
const Template = require('../../models/Template');
let controller = {};

controller.show = async (req, res, next) => {
	  const findTemplate = await Template.find();

	console.log(findTemplate)
	  res.render('generate', { title: 'link',findTemplate: findTemplate});

}

controller.createlink  = async (req,res,next) =>{
	//Récupérer les données du sheets depuis la base
	const template = await Template.findOne({_id : req.body.templateId});
  	const sheet = await Sheets.findOne({templateId : req.body.templateId});
  	
  	//données du formulaire
  	const jour = req.body.jour;
  	const creneau = req.body.creneau;

  	res.render('admin/liste',{title : 'lise',sheet : sheet, jour:jour, creneau: creneau });
  
	
}

module.exports = controller;