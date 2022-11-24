import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import  Jwt  from "jsonwebtoken";


function isValidPassword(user,password) {
    return bcrypt.compareSync(password, user.password);
}

passport.use('login', new LocalStrategy( 
    
    async ( username, password, done) => {
                //const user = usuarios.find(usuario => usuario.username == username)
                const user = await User.findOne( { username : username } )
                console.log('HOLA DE NUEVO', user); 
                if (user == null) {
                    console.log('USUARIO INCORRECTO');
                    return done(null, false)
                }

                //console.log('GATOOOO', user.password);
                

                if (!isValidPassword(user, password)) {
                    console.log('Contrasena Incorrecta');
                    return done(null, false)
                }
                try{
                    const accessToken = Jwt.sign({  //CREAMOS EL JSONWEBTOKEN PARA LA APLICACION
                        id: user._id,
                        isAdmin: user.isAdmin,
                    }, process.env.JWT_SCRET_KEY,  { expiresIn: '3d' })
                    return done(null, user);
                }
                catch (err){ console.log(err) }
                        
}));


//SERIALIZACION
passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

 //DESSERIALIZACION 
passport.deserializeUser(async function ( username , done) {
  //const usuario = usuarios.find(usuario => usuario.username == username)
  const user = await User.findOne( { username : username } )
  done(null, user);
});

export default passport.authenticate ( 'login', { failureRedirect: '/faillogin' } )