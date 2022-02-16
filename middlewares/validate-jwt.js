const { request, response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const User = require( '../models/user' );

const validateJwt = async ( req = request, res = response, next ) => 

{

    const token  = req.header( 'x-token' );

    if ( !token ) return res.json( { message : "Se requiere de un token de autenticacion!" } );

    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    if ( !uid ) return res.json( { message : "Token de autenticacion no valido!" } );

    const user = await User.findById( uid );

    if ( !user || !user.status ) return res.json( { message : "Token de autenciacion no valido!" } );

    req.authUser = user;

    next();

}

module.exports = { validateJwt };