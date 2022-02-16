const UpdateLog = require( '../models/update-log' );

const generateUpdateLog = async ( movie, old_data, new_data ) =>

{

    let data = { movie };
    data.old_data = {};
    data.new_data = new_data;

    Object.keys( new_data ).forEach( ( key ) => 
    
    {
        
        if ( new_data[ key ] ) data.old_data[ key ] = old_data[ key ];

    } );

    const log = UpdateLog( data );

    await log.save();

}

module.exports = { generateUpdateLog }