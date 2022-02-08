const { Schema, model } = require( 'mongoose' );

const MovieSchema = new Schema( 
    
    {

        title : 
        
        {

            type : String,
            required : true

        },

        description : 
        
        { 
             
            type : String,
            required : true

        },
      
        image: 
        
        {
            
            type : String
            
        },
        
        stock : 
        
        {
            
            type : Number,
            default : 0
        
        },

        rental_price : 
        
        {

            type : Number,
            default : 0

        },

        sale_price : 
        
        {

            type : Number,
            default : 0

        },

        likes : 
        
        [
            
            {

                type : Schema.Types.ObjectId,
                ref : 'User'

            }   
        
        ],

        availability : 
        
        {

            type : Boolean,
            default : true

        }

    } );

module.exports = model( 'Movie', MovieSchema );