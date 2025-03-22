// config/socket.js
const socketIO = require("socket.io");
const getGeminiResponse = require("../utils/geminiAI");

const socketSetup = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // WebRTC Signaling
    socket.on("join-room", () => {
      const room = "main-room";
      socket.join(room);
      const clients = Array.from(io.sockets.adapter.rooms.get(room) || []);
      if (clients.length > 1) {
        socket.to(room).emit("ready");
      }
    });

    socket.on("offer", (offer) => {
      socket.to("main-room").emit("offer", offer);
    });

    socket.on("answer", (answer) => {
      socket.to("main-room").emit("answer", answer);
    });

    socket.on("ice-candidate", (candidate) => {
      socket.to("main-room").emit("ice-candidate", candidate);
    });

    // Real-time Chat
    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", message); // Broadcasting message to all clients in the room
    });

    // Gemini AI Chatbot Handling
    socket.on("sendMessageAI", async (message) => {
      try {
        const botReply = await getGeminiResponse(message);
        socket.emit("receiveMessageAI", botReply);
      } catch (err) {
        console.error("Error sending message:", err);
        socket.emit("receiveMessageAI", "⚠️ Sorry, something went wrong.");
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

module.exports = socketSetup;
