const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");

const PORT = 5000;
const application = express();

const GameEngine = path.join(__dirname, "./game_engine/views");
application.use(cors());

const server = http.createServer(application);
const io = socketIO(server, {
  // path: "/game-server",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  },
});
application.set("view engine", "hbs");
application.set("views", GameEngine);
application.use(express.static(GameEngine));

io.on("connection", (socket) => {
  console.log("Connected successfully");
});

application.get("/", (req, res) => {
  res.render("index");
});
application.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

server.listen(9000, () => {
  console.log("Socket on port 9000");
});
