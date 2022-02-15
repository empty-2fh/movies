const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const createUser = async ( req = request, res = response ) =>

{

    const { name, email, password, image, role } = req.body;

    const data =
    
    { 

        name : name.toUpperCase(),
        email,
        password,
        image,
        role

    };

    const user = new User( data );

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.json( { message : 'Usuario creado con exito!', user } );

}

const readUsers = async ( req = request, res = response ) =>

{

    const { sortby = 'name', search, skip = 0, limit = 5 } = req.query;

    let sort = ( sortby === 'role' ) ? { role : 1 }   : ( sortby === 'status' )
                                     ? { status : -1 } : { name : 1 }

    const regexp = ( search ) ? RegExp( search, 'i' ) : undefined;

    const query = ( regexp ) ? { $or : [ { name : regexp }, { role : regexp } ] } : {}; 

    const [ users, total ] = await Promise.all( 
        
        [
            
            User.find( query )
                .sort( sort )
                .skip( ( Number( skip ) > 0 ) ? skip : 0 )
                .limit( ( Number( limit ) >=0 ) ? limit : 0 ),

            User.countDocuments( query )

        ] );

    res.json( { results : { total, users } } );

}

const readUser = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const user = await User.findById( id );

    res.json( { user } );

}

const updateUser = async ( req = request, res = response ) =>

{

    const { id } = req.params;
    
    const { name, email, password, role, image } = req.body;

    const query = {};

    if ( name ) query.name = name.toUpperCase();
    if ( email ) query.email = email;
    
    if ( password ) 
    
    {

        const salt = bcryptjs.genSaltSync();
        query.password = bcryptjs.hashSync( password, salt );

    }

    if ( role )
    
    {

        query.role = role;

    }

    if ( image ) query.image = image;

    const user = await User.findByIdAndUpdate( id, query, { new : true } );

    res.json( { message : "Usuario actualizado con exito!", user } );

}

const removeUser = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const query = { status : false };

    const user = await User.findByIdAndUpdate( id, query, { new : true } );

    res.json( { message : "Usuario removido con exito!", user } );

}

const deleteUser = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const user = await User.findByIdAndDelete( id );

    res.json( { message : "Usuario eliminado con exito!", user } );

}

module.exports = 

{

    createUser,
    deleteUser,
    readUsers,
    readUser,
    removeUser,
    updateUser

}