'use strict';
var assert = require('assert');
var db = require('../utils/mongoConnect.js').db;

describe('Pruebas de la libreria de conexion a base de datos',function(){
	it('Prueba OK: El objeto de conexion se crea de forma correcta',function(){
		assert.strictEqual(db.host,'localhost');
		assert.strictEqual(db.port,27017);
		assert.strictEqual(db.db.s.databaseName,'nodePop');
		db.close();
	});
});