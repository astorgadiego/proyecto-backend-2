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

//--BORRAR USUARIOS

UserRoute.delete('/:id', VerifyAdmin, async (req,res)=> { 
    try{
        await User.findByIdAndDelete( req.params.id )
        res.status(200).json('El usuario fue borrado').redirect('home.html')
    }catch(err){
        res.status(403).json(err)
    }
 } )


 //--MOSTRAR USUARIOS

UserRoute.get('/:id' , async (req,res)=> { 

    try{
        const user = await User.findById( req.params.id )
        console.log('marcador 5', user);
        //VerifyAdmin ( user )
        if ( VerifyAdmin ( user ) === true) {
            console.log('ACCESO CONCEDIDO');
            //res.status(200).json(user)
            res.status(200).render('datos.html', { user })
        }else{
            res.status(403).json( 'No se te permite hacer eso. No sos Admnistrador' )
        }
        
    }catch(err){
        res.status(403).json(err)
    }
 } )
