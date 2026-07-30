import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.MODE === "development"
    ? "http://localhost:8386"
    : "/",
  { autoConnect: false, withCredentials: true }
);