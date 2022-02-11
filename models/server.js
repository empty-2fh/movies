require( 'dotenv' ).config();

const cors =  require( 'cors' );
const express = require( 'express' );

const { conectarDB } = require( '../database/config' );

class Server

{

    constructor()
    
    {

        // Configuracion del servidor express

        this.app = express();
        this.port = process.env.PORT;

        // Endpoints

        this.endpoints = 
        
        {

            movies : '/api/movies',
            roles  : '/api/roles',
            users  : '/api/users'

        };

        // Conexion a la BD

        this.conexionBD();

        // Middlewares

        this.middlewares();

        // Rutas

        this.routes();

    }

    async conexionBD()
    
    {

        await conectarDB();

    }

    middlewares()
    
    {

        // CORS
        
        this.app.use( cors() );

        // Parseo de lectura y escritura

        this.app.use( express.json() );

        // Directorio publico

        this.app.use( express.static( 'public' ) );

    }

    routes()
    
    {

        this.app.use( this.endpoints.movies, require( '../routes/movies' ) );
        this.app.use( this.endpoints.roles, require( '../routes/roles' ) );
        this.app.use( this.endpoints.users, require( '../routes/users' ) );

    }

    listen()
    
    {

        this.app.listen( this.port, () => console.log( 'Servidor corriendo en http://localhost:' + this.port ) );

    }

}

module.exports = Server;