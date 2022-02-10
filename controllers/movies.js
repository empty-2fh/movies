const { ObjectId } = require( 'mongoose' ).Types;
const { request, response } = require( 'express' );

const Movie = require( '../models/movie' );
const { newUpdateLog } = require( '../helpers/save-update-log' );

const createMovie = async ( req = request, res = response ) =>

{

    const { title, description, image, rental_price, sale_price, stock } = req.body;

    const data = 
    
    { 
        
        title : title.toUpperCase(), 
        description,
        image : ( image ) ? image : '',
        rental_price : ( rental_price ) ? rental_price : 0,
        sale_price : ( sale_price ) ? sale_price : 0,
        stock : ( stock ) ? stock : 0, 
    
    }

    const movie = new Movie( data );

    await movie.save();

    res.json( { message : "Pelicula creada con exito", movie } );

}

const readMovies = async ( req = request, res = response ) =>

{

    const { sortby, search, limit = 5, skip = 0 } = req.query;

    const sort = ( sortby == "likes" ) ? { total_likes : -1 } : { title : 1 };

    const regexp = ( search ) ? RegExp( search, 'i' ) : "";

    let query = ( req.authUser ) ? {} : { availability : true };

    if ( regexp ) query.title = regexp;

    const [ movies, total ] = await Promise.all( [ 
        
            Movie.find( query )
                       .sort( sort ) 
                       .select( '-rental_price -sale_price -stock' )
                       .skip( Number( skip ) )
                       .limit( Number( limit ) ),

            Movie.countDocuments( query )

        ] );

    res.json( { results : { total, movies } } );

}

const readMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const movie = await Movie.findById( id )
                             .select();

    res.json( { movie } )

}

const updateMovie = async ( req = request, res = response ) => 

{

    const { id } = req.params;
    const { title, description, image, rental_price, sale_price, stock } = req.body;

    const old_data = await Movie.findById( id );

    let data = {};

    if ( title ) data.title = title;
    if ( description ) data.description = description;
    if ( image ) data.image = description;
    if ( rental_price && Number( rental_price ) >= 0 ) data.rental_price = rental_price;
    if ( sale_price  && Number( sale_price ) >= 0 ) data.sale_price = sale_price;
    if ( stock && Number( stock ) >= 0 ) data.stock = stock;

    const new_data = 
    
    {

        title : data.title,
        rental_price : data.rental_price,
        sale_price : data.sale_price

    };

    const movie = await Movie.findByIdAndUpdate( id, data, { new : true } );

    await newUpdateLog( id, old_data, new_data );

    res.json( { message : "Pelicula actualizada con exito", movie } );

}

const removeMovie = async ( req = request, res = response ) => 

{

    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate( id, { availability : false }, { new : true } );

    res.json( { message : "Pelicula removida con exito", movie } );

}

const deleteMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete( id );

    res.json( { message : "Pelicula eliminada con exito", movie } );

}

const likeMovie = async ( req = request, res = response ) => 

{

    const { id } = req.params;
    const { user_id } = req.body;

    let { likes } = await Movie.findById( id );
    let message = "Esta pelicula ahora te gusta!";

    if ( likes.includes( user_id ) ) 
    
    {
        
        likes.remove( user_id );
        message = "Esta pelicula ya no te gusta!"
    
    }

    else
    
    {
    
        likes.push( user_id );

    }

    await Movie.findByIdAndUpdate( id, { likes } );

    res.json( { message } );

}

module.exports = 

{

    createMovie,
    deleteMovie,
    likeMovie,
    readMovies,
    readMovie,
    removeMovie,
    updateMovie,
}