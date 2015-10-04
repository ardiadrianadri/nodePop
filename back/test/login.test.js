'use strict';

var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var router100 = require('../controllers/1.0.0/router.js').router100;
var errorHandler = require('../utils/errorHandler.js').errorHandler;
var i18nErrors = require('../utils/errorMessage.js').i18nError;

describe('Test unitarios de la libreria de login',function(){
	var app = null;
	var messages = null;

	before(function(){
		app = express();
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use('/',router100);
		app.use(errorHandler);
		messages = i18nErrors();
	});

	it('Test KO: No se pasa el mail para el login',function(){
		request(app).
		get('/login').
		expect(500,{
			code:10102,
			message:messages['10102']
		});
	});

	it('Test KO: No se pasa el passwd para el login',function(){
		request(app).
		get('/login?email=ardiadrianadri@gmail.com').
		expect(500,{
			code:10103,
			message:messages['10103']
		});
	});

	it('Test OK: Se obtiene el token de logado',function(){
		request(app).
		get('/login?email=ardiadrianadri@gmail.com&pw=12qwerty').
		expect(200);
	});

	it('Test OK: El password introducido no es correcto',function(){
		request(app).
		get('/login?email=ardiadrianadri@gmail.com&pw=10qwerty').
		expect(401,{
			code:10401,
			message:messages['10401']
		});
	});
});