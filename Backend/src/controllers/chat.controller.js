import { generateChatTitle, generateResponse, } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js";

export async function sendMessage(req,res){

    const {message, chat:chatId} = req.body

     const result = await generateResponse(message)
      let title = null , chat = null

    if(!chatId){

         title = await generateChatTitle(message);

         console.log(title);
           chat = await chatModel.create({
           user: req.user.id,
           title

    })
         

    }

    const messages = await messageModel.find(chatId);
    console.log(messages);

   
    // console.log("YOU:" ,message);
    // console.log(result);

   

    // const userMessage = await messageModel.create({
    //     chat:chat._id,
    //     content:message,
    //     role:"user"
    // })

    // const aiMessage = await messageModel.create({
    //     chat:chat._id,
    //     content:result,
    //     role:"ai"

    // })
    // res.json({
    //     title,
    //     AI:result,
    //     chat
        
    // })

}