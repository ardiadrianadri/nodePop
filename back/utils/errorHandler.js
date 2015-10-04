'use strict';
(function(){
	let i18nErrors = require('./errorMessage.js').i18nError;

	function activate(err,req,res,next) {
		let messages = null;

		if ((req.query) && (req.query.lang)) {
			messages = i18nErrors(req.query.lang);
		} else {
			messages = i18nErrors();
		}

		err.trace = err.stack;
		err.message=messages[err.code.toString()];
		console.error(err.message);
		res.status(500).json(err);
	}

	exports.errorHandler = activate;
}());
