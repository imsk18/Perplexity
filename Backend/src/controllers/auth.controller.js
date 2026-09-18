import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import { sendEmail } from "../services/mail.service.js";
import { verifyEmailTemplate } from "../templates/verifyEmail.js";
import jwt from "jsonwebtoken"

export async function registerController(req,res){
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

         const emailVerificationToken = jwt.sign({
            email: user.email
         },process.env.JWT_SECRET)

         await sendEmail({
            to:email,
            subject:"welcome to perplexity !",
            html: verifyEmailTemplate(username,emailVerificationToken),
         })

         res.status(201).json({
            message:"user register successfully ",
            success:true,
            user:{
                userId: user._id,
                username: user.username,
                email: user.email
            }
         })



    }catch(err){
        console.error("user register failed", err)
    }

   
}

/**
 * @description login user
 * @access public
 * @route api/auth/login
 * 
 */
export async function loginController(req,res){
    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        return res.status(401).json({
            message:"invalid email or password",
            success:false,
            err:"user not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"invalid email or password",
            success:false,
            err:"invalid password"
        })
    }

    if(!user.isVerified){
        return res.status(400).json({
            message:"please verify email before logging in",
            success:false,
            err:"email not verified"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token);

    res.status(200).json({
        message:"user log in successfully",
        success:true,
        user:{
            userId: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @description login user
 * @access public
 * @route api/auth/login
 * 
 */
export async function getMe(req,res){
    const userId =  req.user.id
    const user = await userModel.findById(userId);
    console.log(userId);
    if(!user){
        return res.status(400).json({
            message:"user not found",
            success:false,

        })
    }

    res.status(200).json({
        message:"user fetched successfully",
        success:true,
        user
    })
}

export async function verifyEmail(req,res){

    try{
          const {token}  = req.query

    if(!token){
        return res.status(400).send(
            `
             <h1>Invalid Request</h1>
            <p>Verification token is missing.</p>
            `
        )
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findOne({email:decoded.email});
    if(!user){
        return res.status(400).send(
            `<h1>User Not Found</h1>
                <p>This verification link is invalid.</p>
                `
        )
    }

    user.isVerified=true;
    await user.save();

    res.send(`
       
        <h1>Email verify successfully !</h1>
        <p>your email has been verified. you can now log in to your Account .</p>
        `
    )

}catch(err){
        console.error("user user verified failed", err)
    }

}


