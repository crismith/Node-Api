'use strict'

//usamos mongoose para poder usar nuestra DB y  conectaros
const mongoose = require('mongoose');

//Llamamos a express  des pues de averlo descargado
const express = require('express');

//body  parser nos ayuda a leer los datos en formato JSon
const bodyParser = require('body-parser');

//usamos express llamando a su funcion 
const app = express();

//exportamos nuestras rutas
const api = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//usamos nuestras rutas
app.use("/api", api);


module.exports = app;
