const { request, response } = require( 'express' );

const Movie = require( '../models/movie' );

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

    const movies = await Movie.find()
                              .select( '-rental_price -sale_price -stock -likes' );

    res.json( { movies } );

}

const readMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const movie = await Movie.findById( id );

    res.json( { movie } )

}

const updateMovie = async ( req = request, res = response ) => 

{

    const { id } = req.params;

    const { title, description, image, rental_price, sale_price, stock } = req.body;

    let data = {};

    if ( title ) data.title = title;
    if ( description ) data.description = description;
    if ( image ) data.image = description;
    if ( rental_price && Number( rental_price ) >= 0 ) data.rental_price = rental_price;
    if ( sale_price  && Number( sale_price ) >= 0 ) data.sale_price = sale_price;
    if ( stock && Number( stock ) >= 0 ) data.stock = stock;

    const movie = await Movie.findByIdAndUpdate( id, data, { new : true } );

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

module.exports = 

{

    createMovie,
    readMovies,
    readMovie,
    updateMovie,
    removeMovie,
    deleteMovie

}