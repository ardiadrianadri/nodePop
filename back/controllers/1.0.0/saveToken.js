'use strict';

/**
* @api {post} /1.0.0/signin saveToken
* @apiName saveToken
* @apiDescription Guarda el token push asociado a un dispositovo y un usuario
* @apiVersion 1.0.0
* @apiGroup Usuario
*
* @apiParam (POST) {String} device Tipo de dispositivo.
* @apiParam (POST) {String} token Token a almacenar
* @apiParam (POST) {String} mail Email que identifica al usuario del dispositivo
* @apiParam (GET) {String} lang Idioma del api
*
* @apiParamExample {json} Ejemplo del cuerpo del mensaje
*	{
*		"device":"ios",
*		"token":"eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o",
*		"mail":"ardiadrianadri@gmail.com"
*	}
*
* @apiSuccess {Number} code Indica el resutlado de la operacion. 0 = OK
* @apiSuccess {Object} data Objeto compuesto de los siguientes campos:
* @apiSuccess {Number} data.__v Version del documento
* @apiSuccess {String} data.device Tipo de dispositivo
* @apiSuccess {String} data.token Token almacenado en la base de datos
* @apiSuccess {String} data.email Email del usuario
* @apiSuccess {String} data._id Clave primaria del usuario en la base de datos
* @apiSuccess {String} data.created Fecha de guardado del token
*
* @apiSuccessExample Respuesta del servicio:
*	HTTP/1.1 200 OK
*	{
*		"code": 0,
*		"data":{
*			"__v": 0,
*			"device": "ios",
*			"token": "eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o",
*			"mail": "ardiadrianadri@gmail.com",
*			"_id": "560fce63cb17d23328b20301",
*			"created": "2015-10-03T12:47:31.523Z"
*		}
*	}
*
* @apiExample {curl} Ejemplo de uso
*	curl -i http://localhost:3000/1.0.0/saveToken?lang=es
*
* @apiUse xAccessTokenHeader
* @apiUse 10403Error
* @apiUse 10106Error
* @apiUse 10107Error
* @apiUse 10108Error
* @apiUse 10102Error
* @apiUse 10502Error 
*/

(function(){
	let TokenPush = require('../../entities/token.js').tokenPush;
	let config = require('../../utils/config.js');

	function activate (req,res,next){
		let tokenReq = null;
		let error = null;
		let newTokenPush = null;
		let rightDevice = false;

		if (req.body){
			tokenReq = req.body;
		}

		if ((!tokenReq) || (!tokenReq.device)){
			error = new Error();
			error.code = 10106;
			return next(error);
		}

		rightDevice = config.token.devicesAllowed.reduce(function(valorPrevio,valorActual){
			return valorPrevio || (valorActual === tokenReq.device);
		},rightDevice);

		if (!rightDevice){
			error = new Error();
			error.code=10108;
			return next(error);
		}

		if (!tokenReq.token){
			error = new Error();
			error.code = 10107;
			return next(error);
		}

		if (!tokenReq.mail){
			error = new Error();
			error.code = 10102;
			return next(error);
		}

		newTokenPush = new TokenPush({
			device: tokenReq.device,
			token: tokenReq.token,
			mail: tokenReq.mail
		});

		newTokenPush.save(function(err,token){
			if (err){
				error = new Error();
				error.code = 10502;
				error.origen = err;
				next(err);
			} else {
				res.status(200);
				res.json({code:0,data:token});
			}
		});
	}

	exports.saveTokenCtrl = activate;
}());