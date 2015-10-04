'use strict';

let request = require('supertest');
let express = require('express');
let bodyParser = require('body-parser');
let router100 = require('../controllers/1.0.0/router.js').router100;
let errorHandler = require('../utils/errorHandler.js').errorHandler;
let i18nErrors = require('../utils/errorMessage.js').i18nError;

describe('Pruebas del servicio rest para filtrado de la base de datos',function(){
	let app = null;
	let messages = null;

	before(function(){
		app = express();
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use('/',router100);
		app.use(errorHandler);
		messages = i18nErrors();
	});

	it('Prueba KO: No pasamos ningun parametro a la busqueda',function(){
		request(app).
		get('/filter').
		expect(500,{
			code:10104,
			message:messages['10104']
		});
	});

	it('Prueba OK: Utilizamos la paginacion por defecto',function(){
		request(app).
		get('/filter?art=Articulo&vend=false&prMin=5&prMax=500&dtMin=2015-09-30&dtMax=2015-10-02&tags=work,ClifeStyle&sort=precio|1,created|-1').
		expect(200,{
			code:0,
			page:1,
			size:5
		});
	});

	it('Prueba OK:Configuramos la paginacion',function(){
		request(app).
		get('filter?art=Articulo&vend=false&prMin=5&prMax=500&dtMin=2015-09-30&dtMax=2015-10-02&tags=work,ClifeStyle&sort=precio|1,created|-1&pag=2&size=10').
		expect(200,{
			code:0,
			page:2,
			size:10
		});
	});
});