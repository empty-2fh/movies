const { Router } = require( 'express' );

const 

{ 
    
    createRole, 
    readRoles, 
    readRole,
    removeRole, 
    deleteRole,
    updateRole

} = require( '../controllers/roles' );

const { isAdmin, validateData, validateJwt } = require( '../middlewares/' );

const router = Router();

router.get( '/list/', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    readRoles );

router.get( '/details/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    readRole );

router.post( '/create/', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    createRole );

router.put( '/update/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    updateRole );

router.put( '/remove/:id', 

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    removeRole );

router.delete( '/delete/:id',

    [

        validateJwt,
        isAdmin,
        validateData

    ],

    deleteRole );

module.exports = router;