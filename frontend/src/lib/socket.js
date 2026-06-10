import { io } from "socket.io-client";

export const socket = io("http://localhost:8386",
    { autoConnect: false,
      withCredentials: true }
);
