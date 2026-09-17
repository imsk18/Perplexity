import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"

export async function registerController(req,res,next){
    const {email,username,password} = req.body
    try{
         const isUserAlreadyExist = await userModel.findOne({
         $or:[{email},{username}]
         })

         if(isUserAlreadyExist){
            return res.status(400).json({
                // message:"user already exist " + (isUserAlreadyExist.email === email?"email" : "username");
                message:"user already exists with this email or username",
                success:false,
                err:"user already exist"
            })
         }

         const user = await userModel.create({email,username,password});



    }catch(err){
        next(err)
    }

   
}

