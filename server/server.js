const http = require("http");
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const socket = require("socket.io");

const myIo = require("./sockets/io");
const routes = require("./routes/routes");

const app = express();
const server = http.Server(app);
const io = socket(server);

server.listen(3000);

games = {};

myIo(io);

console.log(`Server listening on port 3000`);

const Handlebars = handlebars.create({
  extname: ".html",
  partialsDir: path.join(__dirname, "..", "client", "views", "partial"),
  defaultLayout: false,
  helpers: {},
});
app.engine("html", Handlebars.engine);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "..", "client", "views"));
app.use(
  "/public",
  express.static(path.join(__dirname, "..", "client", "public"))
);

routes(app);
