import http from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
import { UserManager } from './managers/UserManager';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();
let count = 1;



io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser(`Person${count++}`, socket);
  socket.on('skip',()=>{
    console.log("skipped")
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
