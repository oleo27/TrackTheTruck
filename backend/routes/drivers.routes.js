const express = require("express");
const router = express.Router();

const pool = require("../db");

// GET
router.get("/", async (req, res) => {
	const result = await pool.query("SELECT * FROM drivers");
	res.json(result.rows);
});

// POST
router.post("/", async (req, res) => {
	const { first_name, last_name } = req.body;

	const result = await pool.query(
		"INSERT INTO drivers (first_name, last_name) VALUES ($1, $2) RETURNING *",
		[first_name, last_name],
	);
	res.json(result.rows[0]);
});

// PUT
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { first_name, last_name } = req.body;

	const result = await pool.query(
		"UPDATE drivers SET first_name=$1, last_name=$2 WHERE id=$3 RETURNING *",
		[first_name, last_name, id],
	);

	res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const result = await pool.query(
		"DELETE FROM drivers WHERE id=$1 RETURNING *",
		[id],
	);
	res.json(result.rows[0]);
});

module.exports = router;
