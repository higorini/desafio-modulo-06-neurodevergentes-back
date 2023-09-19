const express = require("express");
const routesCotumers = express();

const getCostumerCep = require("../controllers/costumers/getCostumerCep");
const verifyToken = require("../middlewares/validateToken");
const getCostumers = require("../controllers/costumers/getCostumers");
const validateRegisterCostumer = require("../middlewares/validateRegisterCostumer");
const registerCostumer = require("../controllers/costumers/registerCostumer");

routesCotumers.get("/getCostumerCep", getCostumerCep);

routesCotumers.get("/costumers", verifyToken, getCostumers);
routesCotumers.post(
	"/costumer/signup",
	verifyToken,
	validateRegisterCostumer,
	registerCostumer
);


module.exports = routesCotumers;
