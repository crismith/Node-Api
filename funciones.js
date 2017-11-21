var Curso = require("./db/cursos.js");

function curso(request, response) {
	var idcurso = request.params.id;
	if (idcurso > 0) {
		response.send({
			message: "El curso a mostrar es "+idcurso
		});
	} else {
		response.send({
			message: "Necesita mandar el id del curso"
		});
	}
}

function listar(request, response) {

	Curso.find({}).sort('-_id').exec((error, cursos) => {
        if (error) {
            response.status(500).send({
                message: 'Error al devolver los cursos'
            });
        }

        if (!cursos) {
            response.status(404).send({message:'No hay cursoss'});
        }

        response.send({cursos});
    })

}

function insertar(request, response) {
	var parametros = request.body;

    //tenemos que instanciar de cuerpo de la BD
	var curso = new Curso();
    //enviar por parametros los datos que queremos guardar
	curso.nombre = parametros.nombre;
    curso.descripcion = parametros.descripcion;

	curso.save((error, cursoGuardado) => {
        if (error) {
            response.status(500).send({
                message: 'Error al guardar el marcador'
            });
        }

        response.send({
            curso : cursoGuardado,
            parametros: parametros
        });
    })
}

function actualizar (request, response) {
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

function eliminar (request, response) {
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

module.exports = {
    curso,
    listar,
    insertar,
    actualizar,
    eliminar
}
