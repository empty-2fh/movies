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

const router = Router();

router.get( '/list/', readRoles );

router.get( '/details/:id', readRole )

router.post( '/create/', createRole );

router.put( '/update/:id', updateRole );

router.put( '/remove/:id', removeRole );

router.delete( '/delete/:id', deleteRole )


module.exports = router;