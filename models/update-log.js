const { Schema, model } = require( 'mongoose' );

const UpdateLogSchema = new Schema( 
    
    {

        movie : 
        
        {

            type : Schema.Types.ObjectId,
            required : true
            
        },

        old_data : 
        
        {

            type: Object,
            required : true

        },

        new_data : 
        
        {

            type : Object,
            required : true

        },

        date : 
        
        {

            type : Date,
            default : new Date().toISOString()

        }

    } );

UpdateLogSchema.methods.toJSON = function()

{

    const { __v, ...data } = this.toObject();

    return data;

}

module.exports = model( 'Update_Log', UpdateLogSchema );