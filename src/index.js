require("dotenv").config();

const server = require("./servers/server");

server.listen(process.env.PORT);
