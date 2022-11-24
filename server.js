import express from 'express' 
import mongoose from 'mongoose';
import dotenv from "dotenv";
import passport from 'passport';
import session from 'express-session';
import { UserRoute } from "./rutas/user.js"
import { HomeRoute } from './rutas/home.js';
import { renderFile } from 'ejs';

const app = express()

//--CONFIGURACION DEL DOTENV
dotenv.config();

//----CONECTANDOSE A LA BASE DE DATOS 

mongoose
    .connect (process.env.MONGO_URL) //ESTA ES NUESTAR KEY SECRETA, NO SE COMPARTE
        .then( () => console.log("Conectado a base de datos MONGO") )
        .catch( (err)=> console.log( err ) )

//----ENDPOINTS
app.use ( express.static ( './public' )  )

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE

app.use(express.urlencoded({ extended: true }));  //TAMBIEN SON PARA QUE FUNCIONE EL REQ.BODY

//ESTO ES IMPORTANTE PARA PODER USAR EL RES.RENDER!!! 
app.engine('html',  renderFile  );
app.set('view engine', 'html');

/* --------------------- MIDDLEWARE --------------------------- */

app.use(session({
    secret: 'mi super secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  }))

app.use(passport.initialize());
app.use(passport.session());

//---RUTAS
app.use ( '/api/user', UserRoute )

app.use ( '/api/home', HomeRoute )

app.post( '/faillogin', (req,res)=>{
  res.render('failLogin.html' )
})

// app.use ( '/api/products', productRoute )
// app.use ( '/api/carts', cartRoute )


const PUERTO = process.env.PORT || 3000

app.listen( PUERTO , () => { console.log( `BackEnd Escuchando correctamente en puerto ${PUERTO} ` ); } )

