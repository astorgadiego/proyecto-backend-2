import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";


export const usuarios = []

function createHash(password) {
    return bcrypt.hashSync(
              password,
              bcrypt.genSaltSync(0),
              null);
}

passport.use( 'register' , new LocalStrategy ( {
            passReqToCallback: true
        }, async (req, username, password , done) => {
        
        
                    //const usuario = usuarios.find(usuario => usuario.username == username)
                    const usuario = await User.findOne( { username: req.body.username } )
                    console.log('ACA ESTOY', usuario);
                    if (usuario) {
                      return done('already registered')
                    }
                
                    const user = new User ( {
                      username,
                      email: req.body.email ,
                      password: createHash(req.body.password),
                      address: req.body.address,
                      age:req.body.age,
                      phoneNumber: req.body.phoneNumber ,
                      image: req.body.image, 
                    })
                    try{ 
                        const savedUser = await user.save();
                        console.log(savedUser);
                        usuarios.push(user)
                
                        return done(null, user)
                    }
                    catch(err){console.log(err);}
                    

}));

//SERIALIZACION
passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

 //DESSERIALIZACION 
passport.deserializeUser(function (username, done) {
  const usuario = usuarios.find(usuario => usuario.username == username)
  done(null, usuario);
});

export default passport.authenticate ( 'register', { failureRedirect: '/failregister' } )
