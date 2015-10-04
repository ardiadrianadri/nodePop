'use strict';

var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var router100 = require('../controllers/1.0.0/router.js').router100;
var errorHandler = require('../utils/errorHandler.js').errorHandler;
var i18nErrors = require('../utils/errorMessage.js').i18nError;

describe('Test unitario sobre el servicio de listado de tags',function (){
	var messages = null;
	var app = null;

	before(function(){
		messages = i18nErrors();
		app = express();
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use('/',router100);
		app.use(errorHandler);
	});


	it('Prueba OK: Obtenemos el listado de tags de la base de datos',function(){

		request(app).
		post('/listTags').
		expect(200,{
			code:0
		});	
	});
});