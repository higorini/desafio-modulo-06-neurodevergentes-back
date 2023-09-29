const express = require("express");
const routesCharges = express();

const validateRequest = require("../middlewares/validateRequest");
const verifyToken = require("../middlewares/validateToken");
const getCharges = require("../controllers/charges/getCharges");
const postCharges = require("../controllers/charges/postCharges");
const getCharge = require("../controllers/charges/getCharge.js")
const searchCharge = require("../controllers/charges/searchCharge");

const schemaRegisterCharge = require("../schemas/schemaRegisterCharge");

routesCharges.get("/charges", verifyToken, getCharges);
routesCharges.post("/charges/:idCostumer", verifyToken, validateRequest(schemaRegisterCharge), postCharges);
routesCharges.get("/charges/:idCharge", verifyToken, getCharge);
routesCharges.get("/searchCharge", verifyToken, searchCharge);

module.exports = routesCharges;