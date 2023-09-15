const express = require("express");
const routes = express();
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/login");
const validateLogin = require("../middlewares/validateLogin");
const validate = require("../middlewares/validateRegister");

routes.post("/signup", validate, registerUser);
routes.post("/login", validateLogin, loginUser);
module.exports = routes;
