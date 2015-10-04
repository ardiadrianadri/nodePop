'use strict';

/**
* db.ads.find({
*	$and:[{
*		articulo:{$regex:/Articulo mobile./}},
*		{vende:false},
*		{precio:{$gte:30}},
*		{precio:{$lte:100}},
*		{tags:{$in:['work','motor']}}
*	]
*})sort({created:-1}).pretty();
*/

(function(){
	let ads = require('./ad.js').ad;

	function SearchClass () {
		this.query=null;

		this.createQuery = function (articulo,vende,precioMin,precioMax,dateMin,dateMax,tags) {
			debugger;
			let findObj = {$and:[]};
			let articuloFind = {articulo:''};
			let vendeFind = {vende:false};
			let precioMaxFind = {precio:{$lte:0}};
			let precioMinFind = {precio:{$gte:0}};
			let dateMaxFind = {created:{$lte:null}};
			let dateMinFind = {created:{$gte:null}};
			let tagsFind = {tags:{$in:[]}};
			let error = null;
			let count = 0;

			if (arguments.length < 2){
				error = new Error();
				error.code = 10104;
				throw error;
			}

			if (articulo){
				articuloFind.articulo=new RegExp(articulo+'.*');
				findObj.$and.push(articuloFind);
				count ++;
			}

			if (vende){
				vendeFind.vende=(vende === 'true');
				findObj.$and.push(vendeFind);
				count ++;
			}

			if (precioMin){
				precioMinFind.precio.$gte = Number(precioMin);
				findObj.$and.push(precioMinFind);
				count ++;
			}

			if (precioMax){
				precioMaxFind.precio.$lte = Number(precioMax);
				findObj.$and.push(precioMaxFind);
				count ++;
			}

			if (dateMin){
				dateMinFind.created.$gte = new Date(dateMin);
				findObj.$and.push(dateMinFind);
				count ++;
			}

			if (dateMax){
				dateMaxFind.created.$lte = new Date(dateMax);
				findObj.$and.push(dateMaxFind);
				count ++;
			}

			if (tags){
				tagsFind.tags.$in = tags.split(',');
				findObj.$and.push(tagsFind);
				count ++;
			}

			if (count<2){
				error = new Error();
				error.code = 10104;
				throw error;
			} else {
				this.query = ads.find(findObj);
			}
			
		};

		this.sort = function(fieldsSort){
			let sortObj = null;
			let error = null;

			if (!this.query){
				error = new Error();
				error.code=10105;
				throw error;
			}

			if (fieldsSort){
				sortObj = fieldsSort.split(',').reduce(function(valorPrevio,valorActual){
					let arrayActual = valorActual.split('|');
					valorPrevio[arrayActual[0]] = arrayActual[1];
					return valorPrevio;
				},{});
			} else {
				sortObj = {created:-1};
			}

			this.query.sort(sortObj);
		};

		this.cleanQuery = function(){
			this.query = null;
		};
	}

	exports.search = new SearchClass();
}());