const cors = require("cors");
const express = require("express");
const routesUsers = require("../routes/routesUsers");
const routesCotumers = require("../routes/routesCostumers");
const routesNotFound = require("../routes/routesNotFound");
const routesCharges = require("../routes/routesCharges");


const server = express();

server.use(cors());

server.use(express.json());

server.use(routesUsers);

server.use(routesCotumers);

server.use(routesCharges);

server.use(routesNotFound);

module.exports = server;
