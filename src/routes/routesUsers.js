const express = require("express");
const routesUsers = express();

const getUsers = require("../controllers/users/getUsers");
const validateEmail = require("../controllers/users/validateEmail");
const registerUser = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/login");
const verifyToken = require("../middlewares/validateToken");
const getUser = require("../controllers/users/getUser");
const validateEdit = require("../middlewares/validateUpdate");
const editUser = require("../controllers/users/updateUser");
const validateRequest = require("../middlewares/validateRequest");
const schemaRegisterUser = require("../schemas/schemaRegisterUser");
const schemaVerifyEmail = require("../schemas/schemaVerifyEmail");
const schemaLoginUser = require("../schemas/schemaLoginUser");

routesUsers.get("/users", getUsers);

routesUsers.post("/validateEmail", validateRequest(schemaVerifyEmail), validateEmail);
routesUsers.post("/signup", validateRequest(schemaRegisterUser), registerUser);
routesUsers.post("/login", validateRequest(schemaLoginUser), loginUser);

routesUsers.get("/user", verifyToken, getUser);
routesUsers.put("/user/edit", verifyToken, validateEdit, editUser);



module.exports = routesUsers;