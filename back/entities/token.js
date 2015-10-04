'use strict';

(function(){
	let mongoose = require('mongoose');
	let config = require('../utils/config.js');

	let tokenSchema = mongoose.Schema({
		device:{type:String, enum:config.token.devicesAllowed},
		token: String,
		mail: {type:String, index:true},
		created: {type:Date, default:Date.now}
	});

	let TokenPush = mongoose.model('tokenPush',tokenSchema);

	exports.tokenPush = TokenPush;
}());