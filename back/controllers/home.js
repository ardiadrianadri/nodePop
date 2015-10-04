'use strict';

(function(){

	var express = require('express');
	var router = express.Router();

	function activate (req,res){
		var protocol = req.protocol;
		var host = req.get('host');
		var index = {
			v100:{
				signin:{
					uri:protocol+'://'+host+'/1.0.0/signin',
					method:'POST',
					description:'Save a new user in the data base',
					body:{
						name:'string',
						email:'string',
						pw:'string'
					}
				},
				login:{
					uri:protocol+'://'+host+'/1.0.0/login',
					method:'GET',
					description:'Authenticate an user in the app',
					query:{
						name:'string',
						pw:'string'
					}
				},
				filter:{
					uri:protocol+'://'+host+'/1.0.0/filter',
					method:'GET',
					description:'Search ads in the model',
					query:{
						art:'string',
						vend:'string',
						prMin:'number',
						prMax:'number',
						dtMin:'date',
						dtMax:'date',
						tags:'[string]',
						sort:'[string]',
						pag:'number',
						size:'number'
					}
				},
				saveToken:{
					uri:protocol+'://'+host+'/1.0.0/saveToken',
					method:'POST',
					description:'Save in DB the token given by a device of an user',
					body:{
						device:'string',
						token:'string',
						email:'token'
					}
				},
				listTags:{
					uri:protocol+'://'+host+'/1.0.0/listTags',
					method:'GET',
					description:'Get the list of all tags'
				}
			}
		};

		res.json(index);
	}

	router.get('/',activate);
	exports.homeCtrl = router;
}());