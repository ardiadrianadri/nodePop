'use strict';

/**
* @api {get} /1.0.0/listTags ListTags
* @apiName listTags
* @apiDescription Obtenemos el listado de tags
* @apiVersion 1.0.0
* @apiGroup Consulta BD
*
* @apiParam (GET) {String} lang Idioma del api
*
* @apiSuccess {Number} code Indica el resutlado de la operacion. 0 = OK
* @apiSuccess {json[]} data Listado de tags.
* @apiSuccess {Number} data._id Clave primaria del tag
* @apiSuccess {String} data.tag Nombre del tag
* @apiSuccess {Number} data.__v Version del documento
* @apiSuccess {Date} data.created Fecha de creacion del tag
*
* @apiSuccessExample Respuesta del servicio:
*	HTTP/1.1 200 OK
*	{
*	    "code": 0,
*	    "data": [
*	        {
*	            "_id": "561001147128c72c3398f612",
*	            "tag": "mobile",
*	            "__v": 0,
*	            "created": "2015-10-03T16:23:48.771Z"
*	        },
*	        {
*	            "_id": "561001147128c72c3398f611",
*	            "tag": "motor",
*	            "__v": 0,
*	            "created": "2015-10-03T16:23:48.770Z"
*	        },
*	        {
*	            "_id": "561001147128c72c3398f610",
*	            "tag": "lifeStyle",
*	            "__v": 0,
*	            "created": "2015-10-03T16:23:48.770Z"
*	        },
*	        {
*	            "_id": "561001147128c72c3398f60f",
*	            "tag": "work",
*	            "__v": 0,
*	            "created": "2015-10-03T16:23:48.763Z"
*	        }
*	    ]
*	}

*
* @apiExample {curl} Ejemplo de uso
*	curl -i http://localhost:3000/1.0.0/listTags?lang=es
*
* @apiUse xAccessTokenHeader
* @apiUse 10403Error
* @apiUse 10503Error
*/

(function(){
	let Tag = require('../../entities/tags.js').tag;

	function activate(req,res,next){
		let error = null;
		let query = Tag.find();

		query.exec(function(err,tags){
			if (err){
				error = new Error();
				error.code=10503;
				error.origen=err;
				next(error);
			} else {
				res.json({code:0,data:tags});
			}
		});
	}

	exports.listTagCtrl=activate;
}());