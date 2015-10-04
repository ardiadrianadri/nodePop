'use strict';

(function(){
	let mongoose = require('mongoose');
	let tagSchema = mongoose.Schema({
		tag:String,
		created:{type:Date, default:Date.now}
	});
	
	let Tag = mongoose.model('tags',tagSchema);
	
	exports.tag=Tag;
}());