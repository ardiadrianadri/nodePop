'use strict';
var assert = require('assert');
var errorHandler = require('../utils/errorHandler.js').errorHandler;
var i18nError = require('../utils/errorMessage.js').i18nError;

describe('Pruebas unitarias sobre el capturador de expceciones',function(){
	it('Prueba OK: Se envia el objeto json del error',function() {
		var err = new Error();
		var res = {};
		var req={
			query:null
		};
		var messages = i18nError();

		err.code=10101;
		err.message=messages['10101'];

		res.json = function (json){
			assert.strictEqual(json.code,10101);
			assert.strictEqual(json.message,messages['10101']);
		};

		res.status = function (code){
			assert.strictEqual(code,500);
			return this;
		};

		errorHandler(err,req,res);

	});
});