'use strict'

var mongoose = require('mongoose');
var app = require('./app');


// puerto por default 27017
// tengo una base de datos ya creada llamada 'cursofavoritos'
mongoose.connect('mongodb://localhost:27017/profesores', (error, response) => {
    if (error) {
        console.error("Hubo un error al conectarse a MongoDB")
    } 
    console.log('Conexion a MongoDB correcta');
    app.listen("3000")
});