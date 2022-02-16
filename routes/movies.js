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

const { isAdmin, validateData, validateJwt } = require( '../middlewares/' );

const router = Router();

// Peticiones

// Aniadir nueva pelicula - POST - Solamente administradores

router.post( '/add/', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    createMovie );

// Obtener lista de peliculas - GET - Publico

router.get( '/list/', readMovies );

// Obtener detalles de una pelicula - GET - Publico

router.get( '/details/:id', readMovie );

// Actualizar - PUT - Solamente administradores

router.put( '/update/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    updateMovie );

// Remover - PUT - Solamente administradores 

router.put( '/remove/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    removeMovie );

// Eliminar - DELETE - Solamente administradores

router.delete( '/delete/:id',

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    deleteMovie );

// Me gusta - PUT - Usuarios autenticados

router.put( '/like/:id', 

    [

        validateJwt,
        validateData

    ],

    likeMovie );

// Comprar - POST - Usuarios autenticados

router.post( '/purchase/:id',

    [

        validateJwt,
        validateData

    ],

    purchaseMovie );

// Rentar - POST - Usuarios autenticados

router.post( '/rent/:id', 

    [

        validateJwt,
        validateData

    ],

    rentMovie );

// Finalizar renta - POST - Administradores solamente

router.post( '/rent/finish/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    finishRentMovie );

module.exports = router;