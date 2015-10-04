'use strict';

(function(){
	let mongoose = require('mongoose');

	let adSchema = mongoose.Schema({
		articulo:String,
		vende:Boolean,
		precio:Number,
		foto:String,
		tags:[String],
		created:{type:Date, default:Date.now}
	});

	let Ad = mongoose.model('ads',adSchema);

	exports.ad=Ad;
}());