const express = require("express");
const routes = express();
const validate = require("../middlewares/validateRegister");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/login");
const validateLogin = require("../middlewares/validateLogin");

routes.post("/signup", validate, registerUser);
routes.post("/login", validateLogin, loginUser);
module.exports = routes;
