import "dotenv/config"
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {HumanMessage,SystemMessage} from "langchain"
// import { ChatMistralAI } from "@langchain/mistralai";


const geminiModel =new ChatGoogleGenerativeAI({
    model:"gemini-3.6-flash",
    apiKey:process.env.GEMINI_API_KEY
});

const geminiTitleModel =new ChatGoogleGenerativeAI({
    model:"gemini-3.1-flash-lite",
    apiKey:process.env.GEMINI_API_KEY
});

// const mistralModel = new ChatMistralAI({
//       model: "mistral-large-latest",
//       apiKey:process.env.MISTRAL_AI_API
// });

export async function generateResponse(message) {
 const response =   await geminiModel.invoke([
    new HumanMessage(message)
 ])
    // .then((response)=>{
    //      console.log(response.content);
    //      console.log(response.text);
    // })
    return response.text
   
}




//✅ systemMessage uses for custom instruction to ai
export async function generateChatTitle(message){
    const response = await geminiTitleModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.

              User will provide you with the first message of a chat conversation, and you will generate a title that
              captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging,
              giving users a quick understanding of the chat's topic.
          
                 The title must contain only 2-4 words.
                  Do not include quotes, punctuation, or any explanation.
            `),

            new HumanMessage(`
                Generate a title for a chat conversation based on the following first message:

               "${message}"
                `)
    ])

    return response.text
}





