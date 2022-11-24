import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema (
    {
        username: { type: String ,  required : true, unique: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        isAdmin: { type: Boolean , default: false, }  
    },
    { timestamps: true }
);

export default mongoose.model( "User", UserSchema ) //( NOMBRE DEL MODELO, Y NOMBRE DEL ESQUEMA  )