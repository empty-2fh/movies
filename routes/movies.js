const { Router } = require( 'express' );

const 

{ 
    
    createMovie, 
    readMovies, 
    readMovie,
    updateMovie,
    removeMovie,
    deleteMovie 

} = require( '../controllers/movies' );

const router = Router();

// Peticiones

// Aniadir nueva pelicula - POST - Solamente administradores

router.post( '/add/', createMovie );

// Obtener lista de peliculas - GET - Publico

router.get( '/list/', readMovies );

// Obtener detalles de una pelicula - GET - Publico

router.get( '/list/:id', readMovie );

// Actualizar - PUT - Solamente administradores

router.put( '/update/:id', updateMovie );

// Remover - PUT - Solamente administradores 

router.put( '/remove/:id', removeMovie );

// Eliminar - DELETE - Solamente administradores

router.delete( '/delete/:id', deleteMovie );

module.exports = router;