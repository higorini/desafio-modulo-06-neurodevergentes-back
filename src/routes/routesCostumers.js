const express = require("express");
const routesCotumers = express();

const validateRequest = require("../middlewares/validateRequest");
const getCostumerCep = require("../controllers/costumers/getCostumerCep");
const verifyToken = require("../middlewares/validateToken");
const getCostumers = require("../controllers/costumers/getCostumers");
const registerCostumer = require("../controllers/costumers/registerCostumer");

const schemaValidateCep = require("../schemas/schemaValidateCep");
const schemaRegisterCostumer = require("../schemas/schemaRegisterCostumer");

routesCotumers.get("/getCostumerCep/:cep", validateRequest(schemaValidateCep), getCostumerCep);

routesCotumers.get("/costumers", verifyToken, getCostumers);
routesCotumers.post(
	"/costumer/signup",
	verifyToken,
	validateRequest(schemaRegisterCostumer),
	registerCostumer
);

module.exports = routesCotumers;
