const express = require("express");
const routes = express();

const getUser = require("../controllers/users/getUser");
const getUsers = require("../controllers/users/getUsers");
const {
	registerUser,
	validateEmail,
} = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/login");
const editUser = require("../controllers/users/updateUser");

const validateLogin = require("../middlewares/validateLogin");
const validateRegister = require("../middlewares/validateRegister");
const verifyToken = require("../middlewares/validateToken");
const validateEdit = require("../middlewares/validateUpdate");

const registerCostumer = require("../controllers/costumers/registerCostumer");
const getCostumers = require("../controllers/costumers/getCostumers");
const validateRouts = require("../errors/validateRouts");

routes.get("/user", verifyToken, getUser);
routes.get("/users", getUsers);

routes.post("/validateEmail", validateEmail);
routes.post("/signup", validateRegister, registerUser);
routes.post("/login", validateLogin, loginUser);
routes.put("/user/edit", verifyToken, validateEdit, editUser);

routes.get("/costumers", verifyToken, getCostumers);
routes.post("/costumer/signup", verifyToken, registerCostumer);

routes.use(validateRouts);

module.exports = routes;
