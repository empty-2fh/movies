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

const router = Router();

router.get( '/list/', readUsers );

router.get( '/details/:id', readUser );

router.post( '/create/', createUser );

router.put( '/update/:id', updateUser );

router.put( '/remove/:id', removeUser );

router.delete( '/delete/:id', deleteUser );

module.exports = router;