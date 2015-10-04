'use strict';
(function(){
	var mongoose = require('mongoose');

	var userSchema = mongoose.Schema({
		name:String,
		passwd:String,
		_id:String,
		created:{type:Date, default:Date.now}
	});

	var User = mongoose.model('users',userSchema);
	
	exports.user=User;	
}());
