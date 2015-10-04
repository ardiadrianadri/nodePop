'use strict';
(function(){
	var mongoose = require('mongoose');
	var config = require('./config.js');
	var conn = null;

	mongoose.connect(config.uri);

	conn = mongoose.connection;

	conn.on('error',console.error.bind(console, 'connection error:'));
	conn.once('open',function(){
		console.log('Conectamos con la bd en ' + config.uri);
	});
	
	exports.db=conn;
}());
