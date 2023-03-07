import { Router } from "express";

export const HomeRoute = Router()

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      console.log('NO INICASTE SESION');  
      
      res.redirect('/api/user/login')
    }
}

HomeRoute.get('/', isAuth,(req,res) => { 
    console.log('SESION INCIADA');
    res.render('home.html')
})

HomeRoute.get('/compra',isAuth,(req,res) => { 
  console.log('ELIJA LOS PRODUCTOS QUE DESEA');
  res.render('index.html')
})

