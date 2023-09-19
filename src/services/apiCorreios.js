const axios = require("axios");

const api = axios.create({
	baseURL: " viacep.com.br/ws/",
	timeout: 10000,
	header: { "Content-Type": "application/json" },
});

module.exports = api;
