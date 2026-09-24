import dotenv from 'dotenv'
dotenv.config();
import http from "http"
import { initSocket } from './src/sockets/server.socket.js';

import app from "./src/app.js"
import connectToDb from './src/config/database.js'
// import { testAi } from './src/services/ai.service.js';

const httpServer = http.createServer(app);
initSocket(httpServer);

const PORT = process.env.PORT 
connectToDb()
// testAi();

httpServer.listen(PORT,()=>{
    console.log("server is running",PORT);
})