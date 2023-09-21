const express = require("express");
const routesCharges = express();

const verifyToken = require("../middlewares/validateToken");
const getCharges = require("../controllers/charges/getCharges");

routesCharges.get("/charges", verifyToken, getCharges);

module.exports = routesCharges;