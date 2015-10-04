'use strict';

/**
* @api {get} /1.0.0/login Login
* @apiName Login
* @apiDescription Crea el token de logado para un usuario de la aplicacion
* @apiVersion 1.0.0
* @apiGroup Usuario
*
* @apiParam (GET) {String} email Email del usuario
* @apiParam (GET) {String} pw Password del usuario
* @apiParam (GET) {String} lang lang Idioma del api
*
* @apiSuccess {Number} code Indica el resutlado de la operacion. 0 = OK
* @apiSuccess {String} token Token de sesion del usuario
*
* @apiSuccessExample Respuesta del servicio:
*	HTTP/1.1 200 OK
*	{
		"code":0,
*		"token":"eyJhbGciOiJIUzI1NiJ9.QWRyaWFuIEZlcnJlcmVz.XMu4D8vXaSJ4BfgKxjKEeFgao-huy7wjvcu9Vioc82o"
*	}
*
* @apiExample {curl} Ejemplo de uso
*	curl -i http://localhost:3000/1.0.0/login?email=fulanito@hostmail.com&pw=pwd1234&lang=es
*
* @apiUse 10102Error
* @apiUse 10103Error
* @apiUse 10503Error
* @apiUse 10401Error
* @apiUse 11000Error 
*/

(function(){
	var jwt = require('jsonwebtoken');
	var UserDb = require('../../entities/user.js').user;
	var passwordHash = require('password-hash');
	var config = require('../../utils/config.js');


	function createJwt (user) {
		return jwt.sign(user, config.security.secret, {expiresInMinutes: config.security.expire});
	}

	function activate(req,res,next){
		var error = null;
		var query = null;

		if (!req.query.email){
			error = new Error();
			error.code=10102;
			return next(error);
		}

		if (!req.query.pw){
			error = new Error();
			error.code=10103;
			return next(error);
		}

		query = UserDb.find({_id:req.query.email}).sort({created:-1});
		query.exec(function(err,result){
			if (err){
				error = new Error();
				error.origen=err;
				error.code = 10503;
				return next(error);
			}

			if ((result.length === 0) || (!passwordHash.verify(req.query.pw,result[0]._doc.passwd))){
				error=new Error();
				error.code=10401;
				res.status(401).json(error);
			} else {
				res.json({code:0,token:createJwt(result[0]._doc.name)});
			}
		});
	}

	exports.loginCtrl = activate;
}());