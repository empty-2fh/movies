const { Schema, model } = require( 'mongoose' );

const RoleSchema = new Schema( 
    
    {

        role : 
        
        {

            type : String,
            required : true

        },

        status : 
        
        {

            type : Boolean,
            default : true

        }

    } );

RoleSchema.methods.toJSON = function()

{

    const { __v, ...data } = this.toObject();

    return data;

}

module.exports = model( 'Role', RoleSchema );