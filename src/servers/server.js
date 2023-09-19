const cors = require("cors");
const express = require("express");
const routesUsers = require("../routes/routesUsers");
const routesCotumers = require("../routes/routesCostumers");


const server = express();

server.use(cors());

server.use(express.json());

server.use(routesUsers);

server.use(routesCotumers);

module.exports = server;
