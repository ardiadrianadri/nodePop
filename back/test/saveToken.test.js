'use strict';

var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var router100 = require('../controllers/1.0.0/router.js').router100;
var errorHandler = require('../utils/errorHandler.js').errorHandler;
var i18nErrors = require('../utils/errorMessage.js').i18nError;

describe('Pruebas unitarias para el servicio de guardado de tokenPush',function (){
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


	it('Prueba KO: No se pasa por post el dispositivo',function(){
		let token = {};

		request(app).
		post('/saveToken').
		send(token).
		expect(500,{
			code:10106,
			message:messages['10106']
		});	
	});

	it('Prueba KO: Se pasa un dispositivo erroneo',function(){
		let token  = {
			device:'pc'
		};

		request(app).
		post('/saveToken').
		send(token).
		expect(500,{
			code:10108,
			message:messages['10108']
		});
	});

	it('Prueba KO: No se pasa por post el token',function(){
		let token={
			device:'ios'
		};

		request(app).
		post('/saveToken').
		send(token).
		expect(500,{
			code:10107,
			message:messages['10107']
		});
	});

	it('Prueba KO: No se pasa por post el mail',function(){
		let token = {
			device:'ios',
			token:'eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o'
		};
		
		request(app).
		post('/saveToken').
		send(token).
		expect(500,{
			code:10102,
			message:messages['10102']
		});
	});

	it('Prueba OK: Almacenamos el tokent',function(){
		let token = {
			device:'ios',
			token:'eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o',
			mail:'fulanito@hostmail.com'
		};

		request(app).
		post('/saveToken').
		send(token).
		expect(200,{
			code:0,
			data:{
				device:'ios',
				token:'eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o',
				mail:'fulanito@hostmail.com'
			}
		});
	});
});