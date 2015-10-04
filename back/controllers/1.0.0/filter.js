'use strict';

/**
* @api {get} /1.0.0/filter filter
* @apiDescription Realiza una busquedas de anuncios en base de datos
* @apiName Filter
* @apiVersion 1.0.0
* @apiGroup Consulta BD
*
* @apiParam (GET) {String} art Subcadena que tiene que contener el articulo en su titulo
* @apiParam (GET) {Boolean} vend Flag que indica si se buscan articulos a la venta u ofertas de compra
* @apiParam (GET) {Number} prMin Precio minimo del producto u oferta
* @apiParam (GET) {Number} prMax Precio maximo del producto u oferta
* @apiParam (GET) {String} dtMin Fecha minima de alta del anuncio en BD. Formato yyyy-mm-dd hh:mm:ss
* @apiParam (GET) {String} dtMax Fecha maxima de alta del anuncio en BD. Formato yyyy-mm-dd hh:mm:ss
* @apiParam (GET) {String} tags Lista de los tags que pueden estar asociados al anuncio. La distintos tags se separan con comas
* @apiParam (GET) {String} sort Lista de parametros por los que ordenar los resultados. los distintos parametros van separados en comas y el sentido del orden se indica con 1 / -1. Los campos por los que ordenar son:articulo,vende,precio y created
* @apiParamExample {String} Ejemplo sort para ordenar por precio ascendente y por fecha de alta descendente:
*	sort=precio|1,created|-1
* @apiParam (GET) {String} pag Numero de pagina
* @apiParam (GET) {String} size Numero de documentos por pagina
* @apiParam (GET) {String} lang Idioma del api
*
* @apiSuccess {Number} code Indica el resutlado de la operacion. 0 = OK
* @apiSuccess {json[]} data Resultados de la consulta
* @apiSuccess {String} data._id Clave primaria del anuncion
* @apiSuccess {String} data.articulo Titulo del articulo
* @apiSuccess {Boolean} data.vende Flag que indica si es un anuncio de venta o una oferta de compra
* @apiSuccess {Number} data.precio Precio del articulo del anuncio
* @apiSuccess {String} data.foto Nombre del fichero que contiene la foto del articulo
* @apiSuccess {Number} data.__v Version del documento
* @apiSuccess {Date} data.created: Fecha de alta del articulo en la base de datos
* @apiSuccess {Number} page Pagina de los resultados
* @apiSuccess {Number} size Tamaño de la pagina
* @apiSuccess {Number} totalPages Numero total de paginas
* @apiSuccess {Number} totalDocs Numero total de documentos
*
* @apiSuccessExample Respuesta del servicio:
*	HTTP/1.1 200 OK
*	{
*	    "code": 0,
*	    "data": [
*	        {
*	            "_id": "560dad98966ee256158971de",
*	            "articulo": "Articulo lifeStyle num 489",
*	            "vende": false,
*	            "precio": 99,
*	            "foto": "photo.jpg",
*	            "__v": 0,
*	            "created": "2015-10-01T22:03:04.662Z",
*	            "tags": [
*	                "work",
*	                "lifeStyle"
*	            ]
*	        },
*	        {
*	            "_id": "560dad98966ee256158971dc",
*	            "articulo": "Articulo mobile num 487",
*	            "vende": false,
*	            "precio": 97,
*	            "foto": "photo.jpg",
*	            "__v": 0,
*	            "created": "2015-10-01T22:03:04.662Z",
*	            "tags": [
*	                "work",
*	                "lifeStyle",
*	                "motor",
*	                "mobile"
*	            ]
*	        },
*	        {
*	            "_id": "560dad98966ee256158971da",
*	            "articulo": "Articulo lifeStyle num 485",
*	            "vende": false,
*	            "precio": 95,
*	            "foto": "photo.jpg",
*	            "__v": 0,
*	            "created": "2015-10-01T22:03:04.662Z",
*	            "tags": [
*	                "work",
*	                "lifeStyle"
*	            ]
*	        },
*	        {
*	            "_id": "560dad98966ee256158971d8",
*	            "articulo": "Articulo mobile num 483",
*	            "vende": false,
*	            "precio": 93,
*	            "foto": "photo.jpg",
*	            "__v": 0,
*	            "created": "2015-10-01T22:03:04.661Z",
*	            "tags": [
*	                "work",
*	                "lifeStyle",
*	                "motor",
*	                "mobile"
*	            ]
*	        },
*	        {
*	            "_id": "560dad98966ee256158971d6",
*	            "articulo": "Articulo lifeStyle num 481",
*	            "vende": false,
*	            "precio": 91,
*	            "foto": "photo.jpg",
*	            "__v": 0,
*	            "created": "2015-10-01T22:03:04.661Z",
*	            "tags": [
*	                "work",
*	                "lifeStyle"
*	            ]
*	        }
*	    ],
*	    "page": "2",
*	    "size": "5",
*	    "totalPages": 50,
*	    "totalDocs": 250
*	}
*
*
* @apiExample {curl} Ejemplo de uso
*	curl -i http://localhost:3000/1.0.0/filter?art=Articulo&vend=false&prMin=5&prMax=500&dtMin=2015-09-30&dtMax=2015-10-02&tags=work,ClifeStyle&sort=precio|1,created|-1&pag=2&size=10&lang=es
*
* @apiUse xAccessTokenHeader
* @apiUse 10403Error
* @apiUse 10503Error
* @apiUse 10104Error
* @apiUse 10105Error 
*/

(function(){

	let search = require('../../entities/search.js').search;
	require('mongoose-pagination');

	function activate (req,res,next){
		let error = null;
		let pag = 1;
		let size = 5;

		try{
			search.createQuery(
				req.query.art,
				req.query.vend,
				req.query.prMin,
				req.query.prMax,
				req.query.dtMin,
				req.query.dtMax,
				req.query.tags);	
	
			search.sort(req.query.sort);

			if (req.query.pag){
				pag = req.query.pag;
			}

			if (req.query.size){
				size = req.query.size;
			}

			console.log('Query sobre base de datos: ' + JSON.stringify(search.query._conditions));
	
			search.query.paginate(pag,size,function(err, result, total){
				let pages = Math.floor(total/size);

				if ((total%size)>0){
					pages ++;
				}

				if (err){
					error = new Error();
					error.code = 10503;
					error.origen=err;
					return next(error);
				}


				res.json({code:0,data:result,page:pag,size:size,totalPages:pages,totalDocs:total});

			});
		} catch (err){
			return next(err);
		}
	}

	exports.filterCtrl = activate;

}());