'use strict';

let Tag = require ('./back/entities/tags.js').tag;
let Ad = require ('./back/entities/ad.js').ad;
let mongoose = require('./back/node_modules/mongoose');
let config = require('./back/utils/config.js');
let conn = null;
let tags = [];
let ads = [];
let copy=[];


function saveEntity (array,done){
	let entity = array.pop();
	let len = array.length;

	entity.save(function(err){
		if (err){
			console.error('Error al salvar la entidad en la base de datos', err);
			process.exit(1);
		}

		if (len > 0){
			saveEntity(array,done);
		} else {
			done();
		}
	});
}

function endProcess (){
	if ((copy.length === 0) && (ads.length === 0)){
		process.exit(0);
	}
}

mongoose.connect(config.uri);

conn = mongoose.connection;
conn.on('error',console.error.bind(console, 'connection error:'));
conn.once('open',function(){
	console.log('Conectamos con la bd en ' + config.uri);
	console.log('Creamos los tags');
	let work = new Tag({tag:'work'});
	let lifeStyle = new Tag({tag:'lifeStyle'});
	let motor = new Tag({tag:'motor'});
	let mobile = new Tag({tag:'mobile'});
	
	tags.push(work);
	tags.push(lifeStyle);
	tags.push(motor);
	tags.push(mobile);

	copy = tags.slice(0);
	Tag.remove({}, function(err){
		console.log('Borrando el contenido de tags');
		if (err){
			console.error(err);
			process.exit(1);
		}

		saveEntity(copy,endProcess);
	});
	
	
	console.log('Creamos los anuncios');
	for (let i=0; i<500; i++){
		let indexTag = i % 4;
		let boolVende = false;
		let price = (i % 100) + 10;
		let arrTag = [];
	
		for (let j=0; j< (indexTag + 1); j++){
			arrTag.push(tags[j].tag);
		}
	
		if ((i % 2) === 0){
			boolVende = true;
		}
	
		let ad = new Ad({
			articulo: 'Articulo ' + tags[indexTag].tag + ' num ' + i,
			vende: boolVende,
			precio: price,
			foto: 'photo.jpg',
			tags: arrTag
		});
	
		ads.push(ad);
	}
	
	Ad.remove({},function(err){
		console.log('Borrando el contenido de anuncios');
		if (err){
			console.error(err);
			process.exit(1);
		}
		saveEntity(ads,endProcess);
	});
});

