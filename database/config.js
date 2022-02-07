const mongoose = require( 'mongoose' );

// Conexion a la DB

const conectarDB = async () =>

{

    try
    
    {

        await mongoose.connect( process.env.MONGODB_CNN, 
            
            {

                useNewUrlParser : true,
                useUnifiedTopology : true

            } );

        console.log( 'Conectado a la DB ' );

    }

    catch ( err )
    
    {

        console.log( err );

        throw new Error( 'Error durante la conexion a la DB' );

    }

}

module.exports = 

{

    conectarDB

}