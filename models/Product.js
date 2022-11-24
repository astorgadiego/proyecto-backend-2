import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema (
    {
        tittle: { type: String ,  required : true, unique: true},
        description: { type: String, required: true },
        code: { type: Number, required: true, unique: true },
        image: { type: String, required: true },
        price:{ type: Number, required: true },
        stock: { type: Number, required: true },
        category: { type: Array, required: true, unique: true }   
    },
    { timestamps: true }
);

export default mongoose.model( "Product", ProductSchema ) //( NOMBRE DEL MODELO, Y NOMBRE DEL ESQUEMA  )