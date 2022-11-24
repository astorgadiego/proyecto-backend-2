import mongoose, { mongo } from "mongoose";

const OrderSchema = new mongoose.Schema (
    {
        userID: { type: String ,  required : true},
        pruducts: [{ 

            productID: {  type: String },
            quantity: { type: Number, default: 1} 
        
            } ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String , default: "pending"}    
    },
    { timestamps: true }
);

export default mongoose.model( "Cart", OrderSchema ) //( NOMBRE DEL MODELO, Y NOMBRE DEL ESQUEMA  )