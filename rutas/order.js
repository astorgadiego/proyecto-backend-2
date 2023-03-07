import { Router } from "express";
import Order from "../models/Order.js";
import { VerifyToken, VerifyTokenAndAuthorization, VerifyAdmin } from "../auth/verifyToken.js";

export const OrderRoute = Router()

//CREAR ORDEN

OrderRoute.post( '/', VerifyToken ,async ( req, res ) => {
    
    const NewOrder= new Order( req.body )

    try {
        
        const savedOrder= await NewOrder.save();
        res.status(200).json(savedOrder)


    } catch (error) {
        res.status(500).json(error) 
    }

} )

//ACTUALIZAR ORDEN

OrderRoute.put('/:id', VerifyAdmin, async (req,res) => { 
     
    try {
        
        const updatedOrder = await Order.findByIdAndUpdate ( 
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )

        res.status(200).json(updatedOrder)

    } catch (error) {
        res.status(500).json(error)
    }

})

//BORRARR ORDEN POR ID

OrderRoute.delete('/:id', VerifyAdmin, async (req,res) => {

    try {
        
        await Order.findByIdAndDelete( req.params.id )
        res.status(200).json( 'La Orden ha sido borrada con exito... ').redirect('home.html')

    } catch (error) {
        res.status(500).json(error)
    }

})

//--MOSTRAR ORDEN DEL USUARIO POR ID 

OrderRoute.get('/:userid' , VerifyTokenAndAuthorization ,async (req,res)=> { 
    try{
        const orders = await Order.find( { userID : req.params.userid } )
        console.log('marcador 5', orders);
        res.status(200).json( orders )
        
    }catch(err){
        res.status(403).json(err)
    }
 } )


//--MOSTRAR TODAS LAS ORDENES

OrderRoute.get('/', VerifyAdmin ,async (req,res)=> { 

    try{
        const orders = await Order.find( )
        res.status(200).json( orders )
        
    }catch(err){
        res.status(403).json(err)
    }
 } )  

//GANANCIAS MENSUALES

OrderRoute.get('/income', VerifyAdmin, async (req,res)=> { 

    const date = new Date();    
    const lastMonth = new Date ( date.setMonth ( date.getMonth()-1 ) )
    const previousMonth = new Date ( date.setMonth ( lastMonth.getMonth()-1 ) )

    try {
        
        const income = await Order.aggregate( [ 
            { $match: { createdAt:  { $gte: previousMonth } } },
            { 
                $project: { 
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
                
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
         ] )
         res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }

} )