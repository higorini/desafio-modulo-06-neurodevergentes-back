const express = require("express");
const routesCharges = express();

const validateRequest = require("../middlewares/validateRequest");
const verifyToken = require("../middlewares/validateToken");
const getCharges = require("../controllers/charges/getCharges");
const postCharges = require("../controllers/charges/postCharges");
const getCharge = require("../controllers/charges/getCharge.js");

const {
	schemaRegisterCharge,
	schemaUpdateCharge,
} = require("../schemas/schemaRegisterCharge");
const updateCharge = require("../controllers/charges/putCharge");
const deleteCharge = require("../controllers/charges/deleteCharge");

routesCharges.get("/charges", verifyToken, getCharges);
routesCharges.post(
	"/charges/:idCostumer",
	verifyToken,
	validateRequest(schemaRegisterCharge),
	postCharges
);
routesCharges.get("/charges/:idCharge", verifyToken, getCharge);
routesCharges.put(
	"/charge/:chargeId/edit",
	verifyToken,
	validateRequest(schemaUpdateCharge),
	updateCharge
);
routesCharges.delete("/charge/:chargeId", verifyToken, deleteCharge);
module.exports = routesCharges;
