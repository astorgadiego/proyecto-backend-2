import express from 'express' 
import mongoose from 'mongoose';
import dotenv from "dotenv";
import passport from 'passport';
import session from 'express-session';
import { UserRoute } from "./rutas/user.js"
import { HomeRoute } from './rutas/home.js';
import { ProductsRoute } from './rutas/product.js';
import { CartRoute } from './rutas/cart.js';
import { OrderRoute } from './rutas/order.js';
import { renderFile } from 'ejs';
import { Server as IOServer } from 'socket.io';
import http from 'http'


const app = express()
const httpServer = http.createServer( app )
const io = new IOServer( httpServer )

//--CONFIGURACION DEL DOTENV
dotenv.config();

//----CONECTANDOSE A LA BASE DE DATOS 

mongoose
    .connect (process.env.MONGO_URL)
        .then( () => console.log("Conectado a base de datos MONGO") )
        .catch( (err)=> console.log( err ) )


//----ENDPOINTS

app.use(express.json());  

app.use(express.urlencoded({ extended: true }));  


app.engine('html',  renderFile  );
app.set('view engine', 'html');



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

app.use ( '/api/products', ProductsRoute )

app.use ( '/api/cart', CartRoute )

app.use ( '/api/order', OrderRoute )


app.get( '/faillogin', (req,res)=>{
  res.render('failLogin.html' )
})


//-------------------------------------------
const ListadeProductos =   [];
const Arraymensajes = [];

io.on ('connection', ( socket ) =>{
  console.log("Un usuario se ha conectado");
  socket.emit("Tabla de Productos", ListadeProductos )
  socket.emit("ID de mensaje", Arraymensajes)

  socket.on ( 'guardarProducto', prod => {
      ListadeProductos.push( prod );
      io.sockets.emit ( 'ProductoActual', ListadeProductos )
  })

  socket.on ( "nuevo-mensaje", data=>{ 
      Arraymensajes.push( data )
      io.sockets.emit("Mensajes Actualizados", Arraymensajes)
   });

});



const PUERTO = process.env.PORT || 3000

httpServer.listen( PUERTO , () => { console.log( `BackEnd Escuchando correctamente en puerto ${PUERTO} ` ); } )

