const { Schema, model } = require( 'mongoose' );

const RentSchema= new Schema( 
    
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

        rental_price : 
        
        {

            type : Number,
            required : true

        },

        initial_rental_date :
        
        {

            type : Date,
            required : true

        },

        final_rental_date :
        
        {

            type: Date,
            required : true

        },

        returned_date :
        
        {

            type : Date,

        },

        delay_days :
        
        {

            type : Number,
            default : 0

        },

        penalization_per_delay_day :

        {

            type : Number,
            required : true

        },

        total_rental_price :
        
        {

            type : Number,
            default : 0

        },

        returned : 
        
        {

            type : Boolean,
            default : false

        }

    } );

RentSchema.methods.toJSON = function()

{

    const { __v, ...data } = this.toObject();

    return data;

}

module.exports = model( 'Rent', RentSchema);