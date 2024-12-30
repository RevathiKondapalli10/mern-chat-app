import express from "express";
import path from "path"; // Import path module (only once)
import connectToMongoDb from "./db/connectToMongoDb.js"; // MongoDB connection
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; // Import required modules to use __dirname
import { dirname } from "path"; // Import path to use __dirname in ES modules
import http from "http"; // Import http to create server
import { Server } from "socket.io"; // Import socket.io

dotenv.config();

// Get the current directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.io instance and bind it to the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend requests
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend requests
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve the frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

// Optional Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  
  // Example: Emit a hello message to the client
  socket.emit("hello", "Hello from server!");

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

// Start the Server
server.listen(PORT, () => {
  connectToMongoDb(); // Connect to MongoDB
  console.log(`Server is running on port ${PORT}`);
});

export default app; // Export app for testing or other usage
