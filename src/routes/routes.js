const express = require("express");
const routes = express();
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/login");
const validateLogin = require("../middlewares/validateLogin");
const validate = require("../middlewares/validateRegister");
const verifyToken = require("../middlewares/validateToken");
const getUser = require("../controllers/getUser");
const editUser = require("../controllers/updateUser");
const validateEdit = require("../middlewares/validateUpdate");
const getUsers = require("../controllers/getUsers");
const registerCostumer = require("../controllers/registerCostumer");
const validateRouts = require("../errors/validateRouts");
const getCostumers = require("../controllers/getCostumers");

routes.get("/users", getUsers);
routes.post("/signup", validate, registerUser);
routes.post("/login", validateLogin, loginUser);
routes.get("/user", verifyToken, getUser);
routes.put("/user/edit", verifyToken, validateEdit, editUser);

routes.post("/costumer/signup", verifyToken, registerCostumer);
routes.get("/costumers", verifyToken, getCostumers);

routes.use(validateRouts);

module.exports = routes;
