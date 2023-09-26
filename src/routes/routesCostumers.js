const express = require("express");
const routesCotumers = express();

const validateRequest = require("../middlewares/validateRequest");
const validateCep = require("../middlewares/validateCep");
const getCostumerCep = require("../controllers/costumers/getCostumerCep");
const verifyToken = require("../middlewares/validateToken");
const getCostumers = require("../controllers/costumers/getCostumers");
const registerCostumer = require("../controllers/costumers/registerCostumer");
const getCustomerAndCharges = require("../controllers/costumers/getCostumer");

const schemaValidateCep = require("../schemas/schemaValidateCep");
const schemaRegisterCostumer = require("../schemas/schemaRegisterCostumer");
const schemaUpdateCustomer = require("../schemas/schemaUpdateCostumer");
const updateCustomer = require("../controllers/costumers/updateCostumer");

routesCotumers.get(
	"/getCostumerCep/:cep",
	validateCep(schemaValidateCep),
	getCostumerCep
);

routesCotumers.get("/costumers", verifyToken, getCostumers);
routesCotumers.get(
	"/costumers/:costumerId",
	verifyToken,
	getCustomerAndCharges
);
routesCotumers.post(
	"/costumer/signup",
	verifyToken,
	validateRequest(schemaRegisterCostumer),
	registerCostumer
);
routesCotumers.put(
	"/costumer/:customerId/edit",
	verifyToken,
	validateRequest(schemaUpdateCustomer),
	updateCustomer
);
module.exports = routesCotumers;
