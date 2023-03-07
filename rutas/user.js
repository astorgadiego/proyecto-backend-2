import { Router } from "express";
import User from "../models/User.js";
import register from "./register.js";
import login from "./login.js";
import { VerifyToken, VerifyTokenAndAuthorization, VerifyAdmin } from "../auth/verifyToken.js";


export const UserRoute = Router()

//--TEST
UserRoute.get('/usuario', (req,res)=> { 
    res.send('USUARIO CONECTADO')
 })

//---REGISTER

UserRoute.post( '/register', register, ( req,res ) => {
    res.render('home.html')
})

UserRoute.get('/register', (req,res) => { 
   
    res.render('register.html')
})

//----LOGIN

UserRoute.get('/login', login, (req,res)=>{
    
    
    console.log('marcador');
    res.render('login.html')
} )

UserRoute.post('/login', login, (req,res)=>{
    console.log('SESION INCIADA');
    res.render('home.html')
} )

//---ACTUALIZAR USUARIOS

UserRoute.put('/:id', VerifyTokenAndAuthorization ,async (req,res)=>{ 
    try{
        const updatedUser = await User.findByIdAndUpdate( req.params.id , { $set: req.body }, { new: true } )
        console.log("El ususario actualizado es:", updatedUser);
        res.status(200).json(updatedUser)
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)   
    }
})

//--BORRAR USUARIOS

UserRoute.delete('/:id', VerifyTokenAndAuthorization, async (req,res)=> { 
    try{
        await User.findByIdAndDelete( req.params.id )
        res.status(200).json('El usuario fue borrado').redirect('home.html')
    }catch(err){
        res.status(500).json(err)
    }
 } )


 //--MOSTRAR USUARIO

UserRoute.get('/:id' , async (req,res)=> { 

    try{
        const user = await User.findById( req.params.id )
        console.log('marcador 5', user);
        
        if ( VerifyAdmin ( user ) === true) {
            console.log('ACCESO CONCEDIDO');
            
            res.status(200).render('datos.html', { user })
        }else{
            res.status(403).json( 'No se te permite hacer eso. No sos Admnistrador' )
        }
        
    }catch(err){
        res.status(403).json(err)
    }
 } )

 //--MOSTRAR TODOS LOS USUARIOS

 UserRoute.get('/usuarios', async (req,res)=> { 

    try{
        const users = await User.find( )
        if ( VerifyAdmin ( users ) === true) {
            console.log('ACCESO CONCEDIDO');
            //res.status(200).json(user)
            res.status(200).render('datos.html', { users })
        }else{
            res.status(403).json( 'No se te permite hacer eso. No sos Admnistrador' )
        }
        
    }catch(err){
        res.status(403).json(err)
    }
 } )   


//MOSTRAR ESTADISTICAS DE LOS USUARIOS 
UserRoute.get('/stats', VerifyAdmin, async (req, res ) => {

    const date = new Date();
    const lastYear = new Date( date.setFullYear( date.getFullYear()-1  ) )
    try {
        
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear  } }  },
            { 
                $project:{
                    month: { $month : '$createdAt '},

                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1},
                }
            }
        ])

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error)
    }

})