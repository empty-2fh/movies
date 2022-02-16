const jwt = require( 'jsonwebtoken' );

const generateJwt = async ( uid ) => 

{

    return new Promise( ( resolve, reject ) =>
    
    {

        const payload = { uid };

        jwt.sign( 
            
            payload, 
            process.env.SECRETORPRIVATEKEY, 
            { expiresIn : '4h' }, 
        
            ( err, token ) => ( err ) ? reject( token ) : resolve( token ) );

    } );

}

module.exports = { generateJwt };