import { Router } from "express";
import User from "../models/User.js";
import register from "./register.js";
import login from "./login.js";
import { VerifyToken, VerifyTokenAndAuthorization } from "../auth/verifyToken.js";


export const UserRoute = Router()

//--TEST
UserRoute.get('/usuario', (req,res)=> { 
    res.send('USUARIO CONECTADO')
 })

//---REGITER

UserRoute.post( '/register', register, ( req,res ) => {
    res.render('home.html')
})

UserRoute.get('/register', (req,res) => { 
   
    res.render('register.html')
})

//----LOGIN

UserRoute.get('/login', login, (req,res)=>{
    //console.log('SESION INCIADA');
    console.log('marcador');
    res.render('login.html')
} )

UserRoute.post('/login', login, (req,res)=>{
    console.log('SESION INCIADA');
    res.render('home.html')
} )

//---ACTUALIZAR USUARIOS

UserRoute.put('/:id', async (req,res)=>{ //DESPUES VEMOS SI AGRUEGAMOS EL MIDDLEWARE PARA EL TOKEN, PERO ASI YA FUNCIONA
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

