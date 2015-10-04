'use strict';

/**
* @apiDefine 10101Error
* @apiError (AppError) 10101 El nombre del usuario no ha sido proporcionado
* @apiErrorExample Ejemplo de error 1010:
*  HTTP/1.1 500 Internal Server Error
*  {
* 	"code":1010,
* 	"message":"Falta el nombre del usuario"
*  }
*/

/**
* @apiDefine 10102Error
* @apiError (AppError) 10102 El mail no ha sido proporcionado
* @apiErrorExample Ejemplo error 10102:
*	HTTP/1.1 500 Internal Server Error
*	{
*	  "code":10102,
*	  "message":"Falta el email del usuario"
*	}
*/

/**
* @apiDefine 10103Error
* @apiError (AppError) 10103 El password del usuario no ha sido proporcionado
* @apiErrorExample Ejemplo error 10103:
*	HTTP/1.1 500 Internal Server Error
*	{
*	  "code":10103,
*	  "message":"Falta el password del usuairo"
*	}
*/

/**
* @apiDefine 10501Error
* @apieError (DataBaseError) 10501 Error en la conexion con base de datos
* @apiErrorExample Ejemplo Error 10501:
*	HTTP/1.1 500 Internal Server Error
*	{
*	  "code":10501,
*	  "origen":{
*		"name":"MongoError",
*		"message":"Can't canonicalize query: BadValue unknown top level operator: $regex",
*		"$err":"Can't canonicalize query: BadValue unknown top level operator: $regex",
*		"code":"17287"
*	  }
*	  "message":"Fallo en la conexion con la base de datos"
*	}
*/

/**
* @apiDefine 10502Error
* @apiError (DataBaseError) 10502 Error de escritura en base de datos
* @apiErrorExample Ejemplo error 10502:
*	HTTP/1.1 500 Internal Server Error
*	{
*	  "code":10502,
*	  "origen":{
*		"name":"MongoError",
*		"message":"Can't canonicalize query: BadValue unknown top level operator: $regex",
*		"$err":"Can't canonicalize query: BadValue unknown top level operator: $regex",
*		"code":"17287"
*	  }
*	  "message":"Fallo en la escritura de base de datos"
*	}
*/

/**
* @apiDefine 10503Error
* @apiError (DataBaseError) 10503 Error de lectura en base de datos
* @apiErrorExample Ejemplo error 10503:
*	HTTP/1.1 500 Internal Server Error
*	{
*	  "code":10503,
*	  "origen":{
*		"name":"MongoError",
*		"message":"Can't canonicalize query: BadValue unknown top level operator: $regex",
*		"$err":"Can't canonicalize query: BadValue unknown top level operator: $regex",
*		"code":"17287"
*	  }
*	  "message":"Fallo en la lectura de base de datos"
*	}
*/

/**
* @apiDefine 10401Error
* @apiError (SecurityError) 10401 Usuario y/o password incorrecto
* @apiErrorExample Ejemplo error 10401:
*	HTTP/1.1 401 Unauthorized
*	{
*	  "code":10401,
*	  "message":"Usuario y/o password incorrectos"
*	}
*/

/**
* @apiDefine 11000Error
* @apiError (DataBaseError) 11000 Email duplicado
* @apiErrorExample Ejemplo error 11000
*	HTTP/1.1 500 Internal Server Error
*	{
*    	"code": 11000,
*    	"index": 0,
*    	"errmsg": "E11000 duplicate key error index: nodePop.users.$_id_ dup key: { : \"fulanito@hostmail.com\" }",
*    	"op": {
*    	    "name": "Fulanito",
*    	    "passwd": "sha1$c36f6289$1$396d0bb2ddb1e8b3746c179a64d329a3bd35889e",
*    	    "_id": "fulanito@hostmail.com",
*    	    "created": "2015-10-01T21:19:58.901Z",
*    	    "__v": 0
*    	}
*	}
*/

/**
* @apiDefine 10104Error
* @apiError (AppError) 10104 Parametros insuficientes
* @apiErrorExample Ejemplo error 10104
*	HTTP/1.1 500 Internal Server Error
*	{
*		"code":10104
*		"message":"Al menos son necesarios dos parametros para crear una consulta"
*	}
*/

/**
* @apiDefine 10105Error
* @apiError (AppError) 10105 Se intenta ordenar una consulta vacia
* @apiErrorExample Ejemplo error 10105
*	HTTP/1.1 500 Internal Server Error
*	{
*		"code":10105,
*		"message":"Una consulta vacia no se puede ordenar"
*	}
*/

/**
* @apiDefine 10106Error
* @apiError (AppError) 10106 No se proporciona el dispositivo del token
* @apiErrorExample Ejemplo error 10106
*	HTTP/1.1 500 Internal Server Error
*	{
*		"code":10106,
*		"message":"Falta el dispositivo del token"
*	}
*/

/**
* @apiDefine 10107Error
* @apiError (AppError) 10107 No se proporciona el token a guardar
* @apiErrorExample Ejemplo error 10107
*	HTTP/1.1 500 Internal Server Error
*	{
*		"code":10107,
*		"message":"Falta el token"
*	}
*/

/**
* @apiDefine 10108Error
* @apiError (AppError) 10108 Tipo de dispositivo erroneo
* @apiErrorExample Ejemplo error 10108
*	HTTP/1.1 500 Internal Server Error
*	{
*		"code":10108,
*		"message":"Dispositivo no permitido"
*	}
*/

/**
* @apiDefine 10403Error
* @apiError (SecurityError) 10403 El usuario no esta authorizado para utilizar el servicio
* @apiErrorExample Ejemplo error 10403:
*	HTTP/1.1 401 Unauthorized
*	{
*	  "code":10403,
*	  "message":"Usuario no esta autorizado para acceder al servicio"
*	}
*/

/**
* @apiDefine xAccessTokenHeader
* @apiHeader (SeurityHeader) {String} x-access-token Cabecera con el token de authenticacion de la aplicacion
* @apiHeaderExample Ejemplo de x-access-token
*	x-access-token: eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o
*/


(function(){

	//Librerias
	let cluster = require('cluster');
	let numCores = require('os').cpus().length;
	let config = require('./utils/config.js');

	if (cluster.isMaster){
		for (let i = 0; i<numCores; i++){
			cluster.fork();
		}
	} else {
		let express = require('express');
		let bodyParser = require('body-parser');
		let methodOverride = require('method-override');
		let FileStreamRotator = require('file-stream-rotator');
		let fs = require('fs');
		let morgan = require('morgan');
		let path = require('path');
		let config = require('./utils/config.js');
		require('./utils/mongoConnect.js').db;

		//midleware propios
		let errorHandler = require('./utils/errorHandler').errorHandler;

		//Routers
		let homeCtrl = require('./controllers/home.js').homeCtrl;
		let router100 = require('./controllers/1.0.0/router.js').router100;

		//Configuracion
		let port = (process.env.PORT)?Number(process.env.PORT):3000;

		//Configuramos el log
		let dirLog = path.join(__dirname,config.logConfig.dir);
		if (!fs.existsSync(dirLog)){
			fs.mkdirSync(dirLog);
		}
	
		let accessLogStream = FileStreamRotator.getStream({
			filename:path.join(dirLog,config.logConfig.file),
			frequency:'daily',
			verbose:false
		});

		//Middleware
		let app = express();
	
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use(methodOverride());
		app.use(morgan('dev', {stream: accessLogStream}));
	
		app.use(function(req, res, next) {
			res.set('Access-Control-Allow-Origin', config.CORS.allowOrigins);
			res.set('Access-Control-Allow-Methods', config.CORS.allowMethods);
			res.set("Access-Control-Allow-Headers", config.CORS.allowHeaders);
			next();
		});
	
		//Router home
		app.use('/',homeCtrl);
	
		//Router servicios version 1.0.0
		app.use('/1.0.0',router100);
	
		app.use(errorHandler);
	
		//Arrancamos el servidor
		app.listen(port, function(){
			console.log('Server is running on http://localhost:'+port);
		});
	}
}());