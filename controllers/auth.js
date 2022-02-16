const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const { generateJwt } = require( '../helpers/' );

const login = async ( req = request, res = response ) =>

{

    const { email, password } = req.body;

    const user = await User.findOne( { email } );

    if ( !user || !user.status ) return res.json( { message : "Correo o contrasenia no validos!" } );

    const valid_passw = bcryptjs.compareSync( password, user.password );
    
    if ( !valid_passw ) return res.json( { message : "Correo o contrasenia no validos!" } );

    const jwt = await generateJwt( user.id );    

    res.json( { message : "Inicio de sesion exitoso!", user, jwt } );

}

module.exports = { login }