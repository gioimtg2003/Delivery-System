import { Server, Socket } from "socket.io";
import { VerifyToken } from "./Middlewares/VerifyToken";

let io: Server;
interface ClientToServer {
    JoinRoom: (data: { room: string }) => void;
    LeaveRoom: (data: { room: string }) => void;
    TrackingOrder: (data: {
        transport: string;
        orderId: string;
        lat: number;
        lng: number;
    }) => void;
}

interface ServerToClient {
    invalidToken: () => void;
    pickedUpOrder: (data: { data: string }) => void;
    // Add the invalidToken event to the interface
}
const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", handleSocket);

    io.on("error", (err) => {
        console.error(err);
    });
};

const handleSocket = async (
    socket: Socket<ClientToServer, ServerToClient>
): Promise<void> => {
    try {
        socket.on("disconnect", () => {
            console.log("a user disconnected");
        });
        const { token } = socket.handshake.auth;
        if (!token) {
            console.log("Token socket not found");
            socket.emit("invalidToken");
            socket.disconnect();
            return;
        }
        let TokenPayload = await VerifyToken.handleToken(token);
        if (TokenPayload.err) {
            socket.emit("invalidToken");
            socket.disconnect();
            return;
        }
        console.log(`${TokenPayload.role} connected: id-${TokenPayload.id}`);
        socket.join(`${TokenPayload.role}-${TokenPayload.id}`);

        socket.on("JoinRoom", (data) => {
            socket.join(data.room);
            console.log("Join room: ", data.room);
        });

        socket.on("LeaveRoom", (data) => {
            socket.leave(data.room);
            console.log("Leave room: ", data.room);
        });

        socket.on("TrackingOrder", (data) => {
            console.log("Tracking order: ", data);
            io.to(`${data.orderId}`).emit("TrackingOrder", data);
        });
    } catch (err) {
        console.error(err);
        socket.emit("invalidToken");
        socket.disconnect();
    }
};
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }

    return io;
};

export { initSocket, getIO };
