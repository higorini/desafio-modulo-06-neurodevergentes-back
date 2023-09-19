const express = require("express");
const routesNotFound = express();

const validateRouts = require("../errors/validateRouts");

routesNotFound.use(validateRouts);

module.exports = routesNotFound;