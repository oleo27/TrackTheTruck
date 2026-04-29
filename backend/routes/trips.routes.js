const express = require("express");
const router = express.Router();

const pool = require("../db");

// GET
router.get("/", async (req, res) => {
	const result = await pool.query(`
	  SELECT 
      trips.*,
      drivers.first_name,
      drivers.last_name,
      vehicles.registration_number,
      vehicles.brand
      FROM trips
      LEFT JOIN drivers ON trips.driver_id = drivers.id
      LEFT JOIN vehicles ON trips.vehicle_id = vehicles.id
	`);
	res.json(result.rows);
});

// POST
router.post("/", async (req, res) => {
	const {
		start_location,
		finish_location,
		distance,
		driver_id,
		vehicle_id,
		status,
	} = req.body;

	const result = await pool.query(
		`INSERT INTO trips 
		(start_location, finish_location, distance, driver_id, vehicle_id, status)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING *`,
		[start_location, finish_location, distance, driver_id, vehicle_id, status],
	);

	res.json(result.rows[0]);
});

// PUT
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const {
		start_location,
		finish_location,
		distance,
		driver_id,
		vehicle_id,
		status,
	} = req.body;

	const result = await pool.query(
		`UPDATE trips 
		SET start_location=$1, finish_location=$2, distance=$3, driver_id=$4, vehicle_id=$5, status=$6
		WHERE id=$7
		RETURNING *`,
		[
			start_location,
			finish_location,
			distance,
			driver_id,
			vehicle_id,
			status,
			id,
		],
	);

	res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const result = await pool.query("DELETE FROM trips WHERE id=$1 RETURNING *", [
		id,
	]);

	res.json(result.rows[0]);
});

module.exports = router;
