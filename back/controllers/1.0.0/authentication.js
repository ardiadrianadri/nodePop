'use strict';

(function(){
	let jwt = require('jsonwebtoken');
	let config = require('../../utils/config.js');
	let i18nErrors = require('../../utils/errorMessage.js').i18nError;

	function activate(req,res,next) {
		let token = req.headers['x-access-token'];
		let error = null;
		let messages = null;

		if ((req.query) && (req.query.lang)){
			messages = i18nErrors(req.query.lang);
		} else {
			messages = i18nErrors();
		}

		if (token){
			jwt.verify(token, config.security.secret, function(err,user){
				if (err){
					error = new Error();
					error.code = 10403;
					error.origen=err;
					error.trace = err.stack;
					error.message=messages[error.code.toString()];
					res.status(403).json(error);
				} else {
					req.user=user;
					next();
				}
			});
		} else {
			error = new Error();
			error.code=10403;
			error.trace = error.stack;
			error.messages=messages[error.code.toString()];
			res.status(403).json(error);
		}
	}

	exports.authCtrl = activate;
}());