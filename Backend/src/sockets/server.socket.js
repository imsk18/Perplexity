import { Server, Socket } from "socket.io";

let io;

export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    console.log("socket.io server is RUNNING");

    io.on("connection",(Socket)=>{
        console.log("A user connected", Socket.id);
    })

}

export function getIo(){
    if(!io){
        throw new error("io not initialize")
    }
    return io
}