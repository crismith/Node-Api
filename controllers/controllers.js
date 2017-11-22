var Curso = require("../models/cursos.js");

//para llamar al cursos por su id
function cursoI(request, response) {
	var cursoId = request.params.cursoId;

    Curso.findById(cursoId, (error, curso) => {
        if (error) {
            response.status(500).send({ message: 'Error al devolver el curso'});
        }

        if (!curso) {
            response.status(404).send({message:'No hay curso'});
        }

        response.status(200).send({curso});
    })
}


//trae todos los cursos
function readCurso(request, response) {

	Curso.find({}).sort('-_id').exec((error, cursos) => {
        if (error) {
            response.status(500).send({message: 'Error al devolver los cursos'});
        }

        if (!cursos) {
            response.status(404).send({message:'No hay cursoss'});
        }

        response.send({cursos});
    })

}

//Inserta un nuevo curso

function createCurso(request, response) {
	var parametros = request.body;

    //tenemos que instanciar de cuerpo de la BD
	var curso = new Curso();
    //enviar por parametros los datos que queremos guardar
	curso.nombre = parametros.nombre;
    curso.descripcion = parametros.descripcion;

	curso.save((error, cursoGuardado) => {
        if (error) {
            response.status(500).send({ message: 'Error al guardar el marcador'});
        }

        response.send({
            curso : cursoGuardado,
            parametros: parametros
        });
    })
}

//Actualizar el curso

function updateCurso (request, response) {
    //creamos la variable para luego pasar el id por parametro
    var cursoId = request.params.cursoId
    var update = request.body
    //en el body esta el objeto con sus propiedades las cuales la podemos usar
    console.log(request.body)  

    Curso.findByIdAndUpdate(cursoId, update, (error, cursoUpdate) => {
        if(error){
            response.status(500).send({message: `Error al actualizar el curso: ${error}`})
        }
        response.status(200).send({ curso: cursoUpdate })
    })
    
}

//Eliminar el curso

function deleteCurso (request, response) {
    //creamos la variable para luego pasar el id por parametro
    var cursoId = request.params.cursoId

    Curso.findById(cursoId, (error, curso) => {
        if(error){
            response.status(500).send({message: `Error al borrar el curso: ${error}`})
        }

        if (!curso) {
            response.status(404).send({message:'No eciste el curso'});
        }
        curso.remove(error => {
            if (error){
                response.status(500).send({message: `Error al borrar el curso: ${error}`})
            } 
            response.status(200).send({message: 'El curso ha sido eliminado'})
        })
  })
}


//se exportan las funciones para poder usar en otro archivo
module.exports = {
    cursoI,
    readCurso,
    createCurso,
    updateCurso,
    deleteCurso
}
