const app = require("./app");
const pool = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log("Server działa na porcie", PORT);
});
