'use strict'

//usamos mongoose para poder usar nuestra DB y  conectaros
const mongoose = require('mongoose');

//creamos una variable para luego usarla donde requerimos express que nos ayuda en rutinas de procesamiento en tiempo real 
const express = require('express');

//body  parser nos ayuda a leer los datos en formato JSon

const bodyParser = require('body-parser');

//empezamos a usa express llamando a su funcion 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//requrimos nuestro archivo de rutas
const api = require('./funciones.js')

//llamamos nustras rutas con los metodos HTTP y ala vez la funcion

app.get("/curso/:id?", api.curso);
app.post("/insertar", api.insertar);
app.get("/listar", api.listar);
app.put("/actualizar/:cursoId", api.actualizar);
app.delete("/eliminar/:cursoId", api.eliminar);



//nos conectamos a nuestro servidor y a nuestra BD con usando mongoose
// puerto por defecto de  27017
//
mongoose.connect('mongodb://localhost:27017/profesores', (error, response) => {
    if (error) {
        console.error("Hubo un error al conectarse a MongoDB")
    } else {
        console.log('Conexion a MongoDB correcta');
        app.listen("3000", () => {
			console.log("Listo ! Entra a http://localhost:3000");
		})
    }
});