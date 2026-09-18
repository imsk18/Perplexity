import jwt, { decode } from "jsonwebtoken"


export async function authUser(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unAuthorized",
            success:false,
            err:"token not provide",

        })
    }

    try{

      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      console.log(decoded);
      req.user = decoded
      next()

    }catch(err){
        return res.status(401).json({
            message:"unauthorized user",
            success:false,
            err:"invalid token"
        })
    }

    

    
}