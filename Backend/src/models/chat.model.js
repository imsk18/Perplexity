import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"

    },
    title:{
        type:String,
        default:"new chat",
        trim:true
    }

},{timestamps:true}
)

const chatModel = mongoose.model("Chat",chatSchema)
export default chatModel