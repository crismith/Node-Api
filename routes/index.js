'use strict'

const express = require('express')

const cursoControl = require('../controllers/controllers')

const api = express.Router()

api.get("/cursos", cursoControl.readCurso);
api.get("/curso/:cursoId", cursoControl.cursoI);
api.post("/crear", cursoControl.createCurso);
api.put("/actualizar/:cursoId", cursoControl.updateCurso);
api.delete("/eliminar/:cursoId", cursoControl.deleteCurso);


module.exports = api
