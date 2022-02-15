const { request, response } = require( 'express' );

const Movie = require( '../models/movie' );
const Purchase = require( '../models/purchase' );
const Rent = require( '../models/rent' );

const { newUpdateLog } = require( '../helpers/save-update-log' );
const { init } = require('../models/rent');

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

    res.json( { message : "Pelicula creada con exito!", movie } );

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
                       .skip( ( Number( skip ) >= 0 ) ? skip : 0 )
                       .limit( ( Number( limit ) >= 0 ) ? limit : 0  ),

            Movie.countDocuments( query )

        ] );

    res.json( { results : { total, movies } } );

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

    res.json( { message : "Pelicula actualizada con exito!", movie } );

}

const removeMovie = async ( req = request, res = response ) => 

{

    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate( id, { availability : false }, { new : true } );

    res.json( { message : "Pelicula removida con exito!", movie } );

}

const deleteMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete( id );

    res.json( { message : "Pelicula eliminada con exito!", movie } );

}

const likeMovie = async ( req = request, res = response ) => 

{

    const { id } = req.params;
    const { user_id } = req.body;

    const { likes } = await Movie.findById( id );
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

const purchaseMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;
    const { units = 1 } = req.body;
    const user_id = '6205ee3e614694b4e25bf61c';

    const { sale_price } = await Movie.findById( id );

    const data = 
    
    {

        user : user_id,
        movie : id,
        unit_price : sale_price,
        units,
        purchase_price : sale_price * units

    };

    const purchase = new Purchase( data );

    await purchase.save();

    res.json( { message : "La compra fue exitosa!", purchase } );
}

const rentMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;
    const user_id = '6205ee3e614694b4e25bf61c';

    const { rental_days, rental_price } = await Movie.findById( id );

    const init_date = new Date()
    let final_date = new Date();

    final_date.setDate( init_date.getDate() + rental_days )

    const data = 
    
    {

        user : user_id,
        movie : id,
        rental_price,
        initial_rental_date : init_date.toISOString(),
        final_rental_date : final_date.toISOString(),
        penalization_per_delay_day : rental_price * 0.05
    
    };

    const rent = new Rent( data );

    await rent.save();

    res.json( { message : "La renta esta en curso!", rent } );

}

const finishRentMovie = async ( req = request, res = response ) =>

{

    const { id } = req.params;
    const user_id = '6205ee3e614694b4e25bf61c';

    const rent_data = { movie : id, user : user_id };

    const 
    
    { 
        
        _id : rent_id,
        rental_price, 
        final_rental_date, 
        penalization_per_delay_day 
    
    } = await Rent.findOne( rent_data );

    const returned_date = new Date();

    const dif_days = returned_date.getDate() - final_rental_date.getDate();

    const delay_days = ( ( dif_days ) < 0 ) ? 0 : dif_days;

    const data = 
    
    {

        returned_date : returned_date.toISOString(),
        delay_days,
        total_rental_price : rental_price + ( penalization_per_delay_day * delay_days ),
        returned : true

    }

    const finished_rent = await Rent.findByIdAndUpdate( rent_id, data, { new : true } );

    res.json( { message : "La renta ha finalizado!" , finished_rent } );

}

module.exports = 

{

    createMovie,
    deleteMovie,
    finishRentMovie,
    likeMovie,
    purchaseMovie,
    readMovies,
    readMovie,
    removeMovie,
    rentMovie,
    updateMovie,
}