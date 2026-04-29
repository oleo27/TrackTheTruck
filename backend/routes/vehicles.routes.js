const express = require("express");
const router = express.Router();

const pool = require("../db");

// GET
router.get("/", async (req, res) => {
	const result = await pool.query("SELECT * FROM vehicles");
	res.json(result.rows);
});

// POST
router.post("/", async (req, res) => {
	const { registration_number, brand } = req.body;

	const result = await pool.query(
		"INSERT INTO vehicles (registration_number, brand) VALUES ($1, $2) RETURNING *",
		[registration_number, brand],
	);
	res.json(result.rows[0]);
});

// PUT
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { registration_number, brand } = req.body;

	const result = await pool.query(
		"UPDATE vehicles SET registration_number=$1, brand=$2 WHERE id=$3 RETURNING *",
		[registration_number, brand, id],
	);
	res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const result = await pool.query(
		"DELETE FROM vehicles WHERE id=$1 RETURNING *",
		[id],
	);
	res.json(result.rows[0]);
});

module.exports = router;
