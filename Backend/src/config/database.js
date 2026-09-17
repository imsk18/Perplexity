import mongoose from "mongoose";

async function connectToDb() {
    await mongoose.connect(process.env.DB_URI)
  
        console.log("database connected");
    
    
} 

export default connectToDb