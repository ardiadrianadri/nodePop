'use strict';
(function(){
	let signinCtrl = require('./signin.js').signinCtrl;
	let loginCtrl = require('./login.js').loginCtrl;
	let filterCtrl = require('./filter.js').filterCtrl;
	let saveTokenCtrl = require('./saveToken.js').saveTokenCtrl;
	let listTagCtrl = require('./listTags').listTagCtrl;
	let authCtrl = require('./authentication.js').authCtrl;
	let express = require('express');
	let router = express.Router();

	router.post('/signin',signinCtrl);
	router.get ('/login',loginCtrl);
	if (process.env.SECURITY){
		console.log('Activamos la seguridad');
		router.use (authCtrl);	
	}
//=========================================== ZONA SECURIZADA ===================================================
	router.get('/filter',filterCtrl);
	router.post('/saveToken',saveTokenCtrl);
	router.get('/listTags',listTagCtrl);

	exports.router100=router;

}());