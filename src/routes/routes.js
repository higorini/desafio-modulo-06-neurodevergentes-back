const express = require("express");
const routes = express();
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/login");
const validateLogin = require("../middlewares/validateLogin");
const validate = require("../middlewares/validateRegister");
const verifyToken = require("../middlewares/validateToken");
const getUser = require("../controllers/getUsuer");
const editUser = require("../controllers/updateUser");
const validateEdit = require("../middlewares/validateUpdate");

routes.post("/signup", validate, registerUser);
routes.post("/login", validateLogin, loginUser);

routes.use(verifyToken);

routes.get("/user", getUser);
routes.put("/user/edit", validateEdit, editUser);
module.exports = routes;
