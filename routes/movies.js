const { Router } = require( 'express' );

const 

{ 
    
    createMovie,
    deleteMovie,
    likeMovie,
    purchaseMovie,
    readMovies,
    readMovie,
    removeMovie,
    rentMovie,
    updateMovie,
    finishRentMovie,

} = require( '../controllers/movies' );

const router = Router();

// Peticiones

// Aniadir nueva pelicula - POST - Solamente administradores

router.post( '/add/', createMovie );

// Obtener lista de peliculas - GET - Publico

router.get( '/list/', readMovies );

// Obtener detalles de una pelicula - GET - Publico

router.get( '/details/:id', readMovie );

// Actualizar - PUT - Solamente administradores

router.put( '/update/:id', updateMovie );

// Remover - PUT - Solamente administradores 

router.put( '/remove/:id', removeMovie );

// Eliminar - DELETE - Solamente administradores

router.delete( '/delete/:id', deleteMovie );

// Me gusta - PUT - Usuarios autenticados

router.put( '/like/:id', likeMovie );

// Comprar - POST - Usuarios autenticados

router.post( '/purchase/:id', purchaseMovie );

// Rentar - POST - Usuarios autenticados

router.post( '/rent/:id', rentMovie );

// Finalizar renta - POST - Usuarios autenticados

router.post( '/rent/finish/:id', finishRentMovie );

module.exports = router;