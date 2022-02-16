const { isAdmin } = require( './validate-role' );
const { validateData } = require( './validate-data' );
const { validateJwt } = require( './validate-jwt' );

module.exports = 

{

    isAdmin,
    validateData,
    validateJwt

}