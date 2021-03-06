const { validationResult } = require( 'express-validator' );

const validateData = async ( req, res, next ) =>

{

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) return res.json( errors );

    next();

}

module.exports = { validateData }