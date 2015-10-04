'use strict';
module.exports={
	uri:'mongodb://localhost:27017/nodePop',
	defaultLanguage:'es',
	logConfig: {
		dir:'log',
		file:'apiLog-%DATE%.log',
	},
	security:{
		secret:'stevejobsmuriodeuncancerdehigadoprovocadoporlaingestamasivadeiphoneconketchup',
		expire:120
	},
	CORS:{
		allowOrigins:'*',
		allowMethods:'GET, POST, PUT, DELETE',
		allowHeaders:'Origin, X-Requested-With,Content-Type, Accept'
	},
	token:{
		devicesAllowed:['ios','and']
	}
};