'use strict';

(function(){
	let config= require('./config.js');

	function activate(lang){
		let errorMessage = null;
		if (lang){
			errorMessage = require('../i18n/translate-'+lang+'.js');
		} else {
			errorMessage = require('../i18n/translate-'+config.defaultLanguage+'.js');
		}

		return errorMessage;
	}

	exports.i18nError=activate;
}());