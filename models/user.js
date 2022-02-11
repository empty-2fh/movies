const { Schema, model } = require( 'mongoose' );

const UserSchema = new Schema( 
    
    {

        name :

        {

            type : String,
            required : true

        },

        email : 
        
        {

            type : String,
            required : true

        },

        password : 
        
        {

            type : String,
            required : true

        },

        image :
        
        {

            type : String

        },

        role : 
        
        {

            type : String,
            default : 'USER_ROLE'

        },

        status : 
        
        {

            type : Boolean,
            default : true

        }

    } );

UserSchema.methods.toJSON = function()

{

    const { __v, password, ...data } = this.toObject();

    return data;

}

module.exports = model( 'User', UserSchema );