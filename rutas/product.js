import { Router } from "express";
import Product from "../models/Product.js";
import { VerifyToken, VerifyTokenAndAuthorization, VerifyAdmin } from "../auth/verifyToken.js";

export const ProductsRoute = Router()

//CREAR 

ProductsRoute.post( '/', VerifyAdmin ,async ( req, res ) => {
    
    const NewProduct= new Product( req.body )

    try {
        
        const savedProduct= await NewProduct.save();
        res.status(200).json(savedProduct)


    } catch (error) {
        res.status(500).json(error) 
    }

} )

//ACTUALIZAR PRODUCTOS

ProductsRoute.put('/:id', VerifyAdmin, async (req,res) => { 
     
    try {
        
        const updatedProduct = await Product.findByIdAndUpdate ( 
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )

        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json(error)
    }

})

//BORRARR PRODUCTO POR ID

ProductsRoute.delete('/:id', VerifyAdmin, async (req,res) => {

    try {
        
        await Product.findByIdAndDelete( req.params.id )
        res.status(200).json( 'El producto ha sido borrado con exito... ').redirect('home.html')

    } catch (error) {
        res.status(500).json(error)
    }

})

//--MOSTRAR PRODUCTO

ProductsRoute.get('/:id' , async (req,res)=> { 

    try{
        const product = await Product.findById( req.params.id )
        console.log('marcador 5', product);
        res.status(200).json( product )
        
    }catch(err){
        res.status(403).json(err)
    }
 } )


//--MOSTRAR TODOS LOS PRODUCTOS

ProductsRoute.get('/usuarios', async (req,res)=> { 

    try{
        const products = await Product.find( )
        res.status(200).json( products )
        
    }catch(err){
        res.status(403).json(err)
    }
 } )  