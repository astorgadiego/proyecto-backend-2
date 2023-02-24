import { Router } from "express";
import Cart from "../models/Cart.js";
import { VerifyToken, VerifyTokenAndAuthorization, VerifyAdmin } from "../auth/verifyToken.js";

export const CartRoute = Router()

//CREAR CARRITO

CartRoute.post( '/', VerifyToken ,async ( req, res ) => {
    
    const NewCart= new Cart( req.body )

    try {
        
        const savedCart= await NewCart.save();
        res.status(200).json(savedCart)


    } catch (error) {
        res.status(500).json(error) 
    }

} )

//ACTUALIZAR PRODUCTOS

CartRoute.put('/:id', VerifyTokenAndAuthorization, async (req,res) => { 
     
    try {
        
        const updatedCart = await Cart.findByIdAndUpdate ( 
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )

        res.status(200).json(updatedCart)

    } catch (error) {
        res.status(500).json(error)
    }

})

//BORRARR PRODUCTO POR ID

CartRoute.delete('/:id', VerifyTokenAndAuthorization, async (req,res) => {

    try {
        
        await Cart.findByIdAndDelete( req.params.id )
        res.status(200).json( 'El Carrito ha sido borrado con exito... ').redirect('home.html')

    } catch (error) {
        res.status(500).json(error)
    }

})

//--MOSTRAR CARRITO DEL USUARIO POR ID 

CartRoute.get('/:userid' , VerifyTokenAndAuthorization ,async (req,res)=> { //ESTE ID SERA EL ID DEL USUARIO

    try{
        const cart = await Cart.findOne( { userID : req.params.userid } )
        console.log('marcador 5', cart);
        res.status(200).json( cart )
        
    }catch(err){
        res.status(403).json(err)
    }
 } )


//--MOSTRAR TODOS LOS CARRITOS

CartRoute.get('/', VerifyAdmin ,async (req,res)=> { 

    try{
        const carts = await Cart.find( )
        res.status(200).json( carts )
        
    }catch(err){
        res.status(403).json(err)
    }
 } )  