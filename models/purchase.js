const { Schema, model } = require( 'mongoose' );

const PurcharseSchema = new Schema( 
    
    {

        user : 
        
        {

            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true 

        },

        movie : 
        
        {

            type : Schema.Types.ObjectId,
            ref : 'Movie',
            required : true

        },

        unit_price :
        
        {

            type : Number,
            required : true

        },

        units : 
        
        {

            type : Number,
            required : true

        },

        purchase_price : 
        
        {

            type : Number,
            required : true

        },

        date : 
        
        {

            type : Date,
            default : new Date().toISOString()

        }

    } );

PurcharseSchema.methods.toJSON = function()

{

    const { __v, ...data } = this.toObject();

    return data

}

module.exports = model( 'Purchase', PurcharseSchema );