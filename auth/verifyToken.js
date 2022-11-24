import  Jwt  from "jsonwebtoken";
import User from "../models/User.js";

export const VerifyToken = ( req,res,next ) => {
    const authHeader = req.headers.token

    if (authHeader) {
        Jwt.verify( token, process.env.JWT_SCRET_KEY, ( err, usuario ) =>{
            if (err) {
                res.status(403).json('El token no es valido!')
            }
            req.user = usuario;
            next()
        } )
    } else {
        return res.status(401).json("No estas autenticado")
    }
}

export const VerifyTokenAndAuthorization = ( req,res,next ) =>{
    VerifyToken(req,res,() => { 
        if (req.user.id === req.params.id || req.user.isAdmin ) {
            next()
        } else {
            res.status(403).json(" No se te permite hacer esto!")
        } 
    })
}

export const VerifyAdmin = ( user, res )=>{
    //console.log( 'marcador 4' , user);
    console.log('MARCADOR 4', user.isAdmin);
    if ( user.isAdmin ) {
        console.log('MARCADOR 3');
        //next()
        return true
    }else{
        console.log('MARCADOR 2');
        return false
    }
}