const { request, response } = require( 'express' );

const isAdmin = async ( req = request, res = response, next ) =>

{

    const user = req.authUser;

    if ( !user ) return res.json( { message : "Intento anticipado de verificacion de rol!" } );

    if ( user.role !== "ADMIN_ROLE" ) return res.json( { message : "El usuario no es administrador" } );

    next();

}

module.exports = { isAdmin }