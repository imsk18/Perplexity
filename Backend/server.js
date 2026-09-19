import dotenv from 'dotenv'
dotenv.config();

import app from "./src/app.js"
import connectToDb from './src/config/database.js'
import { testAi } from './src/services/ai.service.js';


const PORT = process.env.PORT 
connectToDb()
testAi();

app.listen(PORT,()=>{
    console.log("server is running",PORT);
})