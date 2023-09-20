const axios = require("axios");

const apiViaCep = axios.create({
	baseURL: "https://viacep.com.br/ws/",
	timeout: 10000,
	header: { "Content-Type": "application/json" },
});

module.exports = apiViaCep;
