const express = require("express");
const routesCharges = express();

const verifyToken = require("../middlewares/validateToken");
const getCharges = require("../controllers/charges/getCharges");
const postCharges = require("../controllers/charges/postCharges");

routesCharges.get("/charges", verifyToken, getCharges);
routesCharges.post("/charges/:idCostumer", verifyToken, postCharges);

module.exports = routesCharges;