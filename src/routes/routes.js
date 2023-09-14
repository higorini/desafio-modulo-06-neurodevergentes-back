const express = require("express");
const routes = express();
const validate = require("../middlewares/validateRegister");
const registerUser = require("../controllers/registerUser");

routes.post("/signup", validate, registerUser);
module.exports = routes;
