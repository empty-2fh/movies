const { Router } = require( 'express' );

const 

{ 
    
    createUser, 
    readUsers, 
    readUser,
    removeUser, 
    updateUser, 
    deleteUser

} = require( '../controllers/users' );

const { isAdmin, validateData, validateJwt } = require( '../middlewares/' );

const router = Router();

router.get( '/list/', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    readUsers );

router.get( '/details/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    readUser );

router.post( '/create/',
    
    [

        validateJwt,
        isAdmin,
        validateData

    ],

    createUser );

router.put( '/update/:id',

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    updateUser );

router.put( '/remove/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    removeUser );

router.delete( '/delete/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    deleteUser );

module.exports = router;