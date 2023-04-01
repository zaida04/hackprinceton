/* 
Server side socket.io connection. 
sets up a real-time connection and listens for messages from clients.
*/
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("send-message", (message) => {
        console.log("Message received: ", message)
        io.emit("receive-message", message);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
