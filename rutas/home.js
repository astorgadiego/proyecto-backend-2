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

