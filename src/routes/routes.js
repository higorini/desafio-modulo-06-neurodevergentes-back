const express = require("express");
const routes = express();

routes.get("/teste", (req, res) => {
	return res.json({ message: "Testando o servidor" });
});
module.exports = routes;
