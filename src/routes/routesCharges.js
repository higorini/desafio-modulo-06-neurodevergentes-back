const express = require("express");
const routesCharges = express();

const validateRequest = require("../middlewares/validateRequest");
const verifyToken = require("../middlewares/validateToken");
const getCharges = require("../controllers/charges/getCharges");
const postCharges = require("../controllers/charges/postCharges");

const schemaRegisterCharge = require("../schemas/schemaRegisterCharge");

routesCharges.get("/charges", verifyToken, getCharges);
routesCharges.post("/charges/:idCostumer", verifyToken, validateRequest(schemaRegisterCharge), postCharges);

module.exports = routesCharges;