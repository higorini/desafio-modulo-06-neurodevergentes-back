const express = require("express");
const routesUsers = express();

const getUsers = require("../controllers/users/getUsers");
const validateEmail = require("../controllers/users/validateEmail");
const registerUser = require("../controllers/users/registerUser");
const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");
const loginUser = require("../controllers/users/login");
const verifyToken = require("../middlewares/validateToken");
const getUser = require("../controllers/users/getUser");
const validateEdit = require("../middlewares/validateUpdate");
const editUser = require("../controllers/users/updateUser");

routesUsers.get("/users", getUsers);

routesUsers.post("/validateEmail", validateEmail);
routesUsers.post("/signup", validateRegister, registerUser);
routesUsers.post("/login", validateLogin, loginUser);

routesUsers.get("/user", verifyToken, getUser);
routesUsers.put("/user/edit", verifyToken, validateEdit, editUser);



module.exports = routesUsers;