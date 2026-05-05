import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_URL) {
  console.error("VITE_API_BASE_URL is not defined. Check your .env.local file");
}

const socket = io(API_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

export default socket;