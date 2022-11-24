import mongoose, { mongo } from "mongoose";

const CartSchema = new mongoose.Schema (
    {
        userID: { type: String ,  required : true},
        pruducts: [{ 
            productID: {  type: String },
            tittle: { type: String ,  required : true, unique: true},
            description: { type: String, required: true },
            code: { type: Number, required: true, unique: true },
            image: { type: String, required: true },
            price:{ type: Number, required: true },
            stock: { type: Number, required: true },
            quantity: { type: Number, default: 1} 
            
        } ] 
    },
    { timestamps: true }
);

export default mongoose.model( "Cart", CartSchema ) //( NOMBRE DEL MODELO, Y NOMBRE DEL ESQUEMA  )