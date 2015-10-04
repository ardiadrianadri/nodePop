'use strict';

let assert = require('assert');
let search = require('../entities/search.js').search;

describe('Pruebas del objeto search',function(){

	it('Prueba KO: Se comprueba que si se pasan menos de dos atributos obtenemos un error',function(){
		let articulo='Articulo';
		try {
			search.createQuery(articulo);
			assert.strictEqual(true,false);
		} catch (err){
			assert.strictEqual(err.code,10104);
		}
	});

	it('Prueba KO: Se le pasa al createQuery tres nulos',function(){
		try{
			search.createQuery(null,null,null);
			assert.strictEqual(true,false);
		}catch(err){
			assert.strictEqual(err.code,10104);
		}
	});

	it('Prueba OK: Se crea una query que filtar articulos',function(){
		let articulo = 'Articulo';
		let query = null;
		let dateStringMin = '2015-01-01';
		let dateQueryMin = new Date(dateStringMin);
		let dateStringMax = '2015-06-20';
		let dateQueryMax = new Date(dateStringMax);
		let tagString = 'work,lifestyle,motor,mobile';
		let tagArray = tagString.split(',');
		let tagEquals = true;
		
		try{
			search.createQuery(articulo,'true','10','300',dateStringMin, dateStringMax,tagString);
			query = search.query._conditions.$and;

			tagEquals = tagArray.reduce(function(valorPrevio,valorActual,indice){
				return valorPrevio && (valorActual === query[6].tags.$in[indice]);
			},true);

			assert.notEqual(null,articulo.match(query[0].articulo));
			assert.strictEqual(true,query[1].vende);
			assert.strictEqual(10,query[2].precio.$gte);
			assert.strictEqual(300,query[3].precio.$lte);
			assert.strictEqual(dateQueryMin.getTime(),query[4].created.$gte.getTime());
			assert.strictEqual(dateQueryMax.getTime(),query[5].created.$lte.getTime());
			assert.strictEqual(true,tagEquals);
		}catch(err){
			assert.strictEqual(false,true);
		}
	});

	it('Prueba KO: Se intenta ordenar una query vacia',function(){
		try{
			search.cleanQuery();
			search.sort();
			assert.strictEqual(false,true);
		} catch (err){
			assert.strictEqual(err.code,10105);
		}
	});

	it('Prueba OK: Se ordena la query por el campo por defecto',function(){
		let articulo = 'Articulo';
		let dateStringMin = '2015-01-01';
		let dateStringMax = '2015-06-20';
		let tagString = 'work,lifestyle,motor,mobile';
		let sortObj = null;
		try{
			search.createQuery(articulo,'true','10','300',dateStringMin, dateStringMax,tagString);
			search.sort();
			sortObj = search.query.options;

			assert.strictEqual(sortObj.sort.created,-1);
		} catch (err){
			assert.strictEqual(false,true);
		}
	});

	it('Prueba OK: Se ordena por precio minimo en sentido ascendete y por fecha de creacion en sentido descendente',function(){
		let articulo = 'Articulo';
		let dateStringMin = '2015-01-01';
		let dateStringMax = '2015-06-20';
		let tagString = 'work,lifestyle,motor,mobile';
		let sortObj = null;
		let sortArray = 'precio|1,created|-1';
		try{
			search.createQuery(articulo,'true','10','300',dateStringMin, dateStringMax,tagString);
			search.sort(sortArray);
			sortObj = search.query.options;
			assert.strictEqual(sortObj.sort.precio,1);
			assert.strictEqual(sortObj.sort.created,-1);
		} catch (err){
			assert.strictEqual(false,true);
		}
	});

});