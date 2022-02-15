const { request, response } = require( 'express' );
const { findByIdAndUpdate } = require('../models/role');

const Role = require( '../models/role' );

const createRole = async ( req = request, res = response ) =>

{

    const { role } = req.body;

    const new_role = new Role( { role } );

    await new_role.save();

    res.json( { message : 'Role creado con exito!', new_role } );

}

const readRoles = async ( req = request, res = response ) =>

{

    const { search, skip = 0, limit = 5 } = req.query;

    const regexp = ( search ) ? Regexp( search, 'i' ) : undefined;

    const query = ( regexp ) ? { role : regexp } : {};

    const [ roles, total ] = await Promise.all( 
        
        [

            Role.find( query )
                .skip( ( Number( skip ) >= 0 ) ? skip : 0 )
                .limit( ( Number( skip ) >= 0 ) ? skip : 0 ),

            Role.countDocuments()

        ] );

    res.json( { results : { total, roles } } );

}

const readRole = async ( req = request, res = response ) => 

{

    const { id } = req.params;

    const role = await Role.findById( id );

    res.json( { role } )

}

const removeRole = async ( req = request, res = response ) => 

{

    const { id } = req.params;

    const query = { status : false };

    const role = await Role.findByIdAndUpdate( id, query, { new : true } );

    res.json( { message : "El rol ha sido removido con exito!", role } )

}

const updateRole = async ( req = request, res = response ) =>

{

    const { id } = req.params;
    const { role } = req.body;

    const query = { role };

    const new_role = await Role.findByIdAndUpdate( id, query, { new : true } );

    res.json( { message : "Rol actualizado con exito!", new_role } );

}

const deleteRole = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const role = await Role.findByIdAndDelete( id );

    res.json( { message : "El rol ha sido eliminado con exito!", role } );

}

module.exports = 

{

    createRole,
    deleteRole,
    readRoles,
    readRole,
    removeRole,
    updateRole

}