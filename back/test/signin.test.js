'use strict';

var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var router100 = require('../controllers/1.0.0/router.js').router100;
var errorHandler = require('../utils/errorHandler.js').errorHandler;
var i18nErrors = require('../utils/errorMessage.js').i18nError;

describe('Test unitarios sobre el controlador de alta de usuarios',function (){
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


	it('Prueba KO: No se pasa por post el nombre del usuario',function(){
		var user = {};

		request(app).
		post('/signin').
		send(user).
		expect(500,{
			code:10101,
			message:messages['10101']
		});	
	});

	it('Prueba KO: No se pasa por post el email del usuario',function(){
		var user = {
			name:'Fulanito'
		};

		request(app).
		post('/signin').
		send(user).
		expect(500,{
			code:10102,
			message:messages['10102']
		});
	});

	it('Prueba KO: No se pasa por post el password del usuario',function(){
		var user={
			name:'Fulanito',
			email:'fulanito@highmail.com'
		};

		request(app).
		post('/signin').
		send(user).
		expect(500,{
			code:10103,
			message:messages['10103']
		});
	});

	it('Prueba OK: Se da de alta el usuario',function(){
		var user = {
			name:'Fulanito',
			email:'fulanito@highmail.com',
			pw:'password123'
		};
		
		request(app).
		post('/signin').
		send(user).
		expect(200,{
			name:'Fulanito',
			email:'fulanito@highmail.com'
		});
	});
});