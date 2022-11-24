import { Router } from "express";
import User from "../models/User.js";


//REGISTER  

router.post ('/register', async ( req,res )=> { 
    const newUser = new User ( {
        username: req.body.username,
        email: req.body.email ,
        password: req.body.password,
        address: req.body.address,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber ,
        image: '##', 
    } )
    try{
        const savedUser = await newUser.save();
        console.log( savedUser );
        res.status(201).send
    }catch (err){
        console.log(err);
        res.send(500).json(err)
    }
    
})




export const router = Router()