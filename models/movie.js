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
                ref : 'Movie'

            }
        
        ],

        availability : 
        
        {

            type : Boolean,
            default : true

        }

    } );

MovieSchema.methods.toJSON = function()

{

    const { __v, ...data } = this.toObject();

    return { ...data, total_likes : data.likes.length };

}

module.exports = model( 'Movie', MovieSchema );