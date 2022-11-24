import  Jwt  from "jsonwebtoken";

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