var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// esto permite definir objetos de tipo schema para trabajar con un tipo de datos concreto

var CursosSchema = new Schema({
    nombre : String,
    descripcion : String
});

module.exports = mongoose.model('Curso', CursosSchema);



