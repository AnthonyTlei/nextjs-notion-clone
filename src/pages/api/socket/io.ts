import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: SocketIOServer & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path,
      addTrailingSlash: false,
    });
    io.on("connection", (s) => {
      console.log("CONNECTED");

      s.on("create-room", (fileId) => {
        console.log("CREATED ROOM");
        s.join(fileId);
      });

      s.on("send-changes", (deltas, fileId) => {
        console.log("CHANGE");
        s.to(fileId).emit("receive-changes", deltas, fileId);
      });

      s.on("send-cursor-move", (range, fileId, cursorId) => {
        s.to(fileId).emit("receive-cursor-move", range, fileId, cursorId);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
