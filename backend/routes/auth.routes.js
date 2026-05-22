const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({
				message: "Wszystkie pola są wymagane",
			});
		}

		const existingUser = await pool.query(
			"SELECT * FROM users WHERE username = $1",
			[username],
		);

		if (existingUser.rows.length > 0) {
			return res.status(400).json({
				message: "Użytkownik już istnieje",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await pool.query(
			`
			INSERT INTO users (username, password, role)
			VALUES ($1, $2, 'user')
			RETURNING id, username, role
			`,
			[username, hashedPassword],
		);

		res.status(201).json(newUser.rows[0]);
	} catch (err) {
		console.error(err);

		res.status(500).json({
			message: "Błąd serwera",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		const result = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);

		const user = result.rows[0];

		if (!user) {
			return res.status(401).json({
				message: "Nieprawidłowe dane",
			});
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			return res.status(401).json({
				message: "Nieprawidłowe dane",
			});
		}

		const token = jwt.sign(
			{
				id: user.id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			},
		);

		res.json({
			token,
			role: user.role,
			username: user.username,
		});
	} catch (err) {
		console.error(err);

		res.status(500).json({
			message: "Błąd serwera",
		});
	}
});

module.exports = router;
