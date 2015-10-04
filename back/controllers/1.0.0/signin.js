'use strict';

/**
* @api {post} /1.0.0/signin Signin
* @apiName Signin
* @apiDescription Da de alta un usuario nuevo en la base de datos
* @apiVersion 1.0.0
* @apiGroup Usuario
*
* @apiParam (POST) {String} name Nombre del usuario
* @apiParam (POST) {String} email Email del usuario
* @apiParam (POST) {String} pw Password del usuario
* @apiParam (GET) {String} lang Idioma del api
*
* @apiParamExample {json} Ejemplo del cuerpo del mensaje
*	{
*		name:"Fulanito Menganito",
*		email:"fulanito@hostmail.com",
*		pw:"1234pw"
*	}
*
* @apiSuccess {Number} code Indica el resutlado de la operacion. 0 = OK
* @apiSuccess {Object} data Objeto compuesto de los siguientes campos:
* @apiSuccess {Number} data.__v Version del documento
* @apiSuccess {String} data.name Nombre del usuario
* @apiSuccess {String} data.passwd Password del usuario encriptado
* @apiSuccess {String} data.email Email del usuario
* @apiSuccess {String} data._id Clave primaria del usuario en la base de datos
*
* @apiSuccessExample Respuesta del servicio:
*	HTTP/1.1 200 OK
*	{
*		"code": 0,
*		"data":{
*			"__v": 0,
*			"name": "Adrian Ferreres",
*			"passwd": "sha1$dcffa07b$1$ee247b7485a678b2e56de9e07c97f9d27a9ba8a1",
*			"email": "ardiadrianadri@gmail.com",
*			"_id": "5602a45fc1d25ef01b0971f0"
*		}
*	}
*
* @apiExample {curl} Ejemplo de uso
*	curl -i http://localhost:3000/1.0.0/signin?lang=es
*
* @apiUse 10101Error
* @apiUse 10102Error
* @apiUse 10103Error
* @apiUse 10502Error 
*/

(function(){

	var passwordHash = require('password-hash');
	var UserDb = require('../../entities/user.js').user;

	function activate(req,res,next){
		var user = null;
		var newUser = null;
		var error=null;

		if (req.body){
			user = req.body;
		}		

		if ((!user) || (!user.name)) {
			error = new Error();
			error.code=10101;
			return next(error);
		}

		if (!user.email){
			error = new Error();
			error.code=10102;
			return next(error);
		}

		if (!user.pw){
			error = new Error();
			error.code=10103;
			return next(error);
		}


		newUser = new UserDb({
			name:user.name,
			passwd: passwordHash.generate(user.pw),
			_id:user.email
		});

		newUser.save(function(err,user){
			if (err){
				error = new Error();
				error.code=10502;
				error.origen=err;
				next(err);
			} else {
				res.status(200);
				res.json({code:0,data:user});
			}
		});
		
	}

	exports.signinCtrl = activate;

}());

