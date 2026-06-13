const pool = require("../db");

const nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż'\-\s]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
const regRegex = /^([A-Z]{3}\s[A-Z0-9]{4}|[A-Z]{2}\s[A-Z0-9]{5})$/;

async function validateRegister(req, res, next) {
	const { username, password } = req.body;
	const errors = [];

	if (!username) {
		errors.push("username: wymagane");
	} else if (!usernameRegex.test(username)) {
		errors.push("username: 3-50 znaków, tylko litery, cyfry i znak _");
	}

	if (!password) {
		errors.push("password: wymagane");
	} else if (password.length < 6 || password.length > 128) {
		errors.push("password: 6-128 znaków");
	}

	if (errors.length) {
		return res.status(400).json({
			message: "Błędy walidacji",
			errors,
		});
	}

	next();
}

async function validateLogin(req, res, next) {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			message: "Wszystkie pola są wymagane",
		});
	}

	next();
}

async function validateDriver(req, res, next) {
	const { first_name, last_name } = req.body;
	const errors = [];

	if (!first_name) {
		errors.push("first_name: wymagane");
	} else if (first_name.length < 2 || first_name.length > 50) {
		errors.push("first_name: 2-50 znaków");
	} else if (!nameRegex.test(first_name)) {
		errors.push("first_name: nie może zawierać cyfr");
	}

	if (!last_name) {
		errors.push("last_name: wymagane");
	} else if (last_name.length < 2 || last_name.length > 50) {
		errors.push("last_name: 2-50 znaków");
	} else if (!nameRegex.test(last_name)) {
		errors.push("last_name: nie może zawierać cyfr");
	}

	if (errors.length) {
		return res.status(400).json({
			message: "Błędy walidacji",
			errors,
		});
	}

	next();
}

async function validateVehicle(req, res, next) {
	const { registration_number, brand } = req.body;
	const errors = [];

	if (!registration_number) {
		errors.push("registration_number: wymagane");
	} else if (!regRegex.test(registration_number)) {
		errors.push("registration_number: nieprawidłowy format");
	}

	if (!brand) {
		errors.push("brand: wymagane");
	} else if (brand.length < 2 || brand.length > 50) {
		errors.push("brand: 2-50 znaków");
	}

	if (req.method === "POST" && registration_number) {
		try {
			const existing = await pool.query(
				"SELECT id FROM vehicles WHERE registration_number = $1",
				[registration_number],
			);

			if (existing.rows.length > 0) {
				errors.push("registration_number: już istnieje");
			}
		} catch (err) {
			console.error(err);
			return res.status(500).json({
				message: "Błąd serwera",
			});
		}
	}

	if (errors.length) {
		return res.status(400).json({
			message: "Błędy walidacji",
			errors,
		});
	}

	next();
}

async function validateTrip(req, res, next) {
	const {
		start_location,
		finish_location,
		distance,
		driver_id,
		vehicle_id,
		status,
	} = req.body;

	const errors = [];

	if (!start_location) {
		errors.push("start_location: wymagane");
	} else if (start_location.length < 2 || start_location.length > 100) {
		errors.push("start_location: 2-100 znaków");
	}

	if (!finish_location) {
		errors.push("finish_location: wymagane");
	} else if (finish_location.length < 2 || finish_location.length > 100) {
		errors.push("finish_location: 2-100 znaków");
	}

	const d = Number(distance);

	if (distance === undefined || distance === null) {
		errors.push("distance: wymagane");
	} else if (isNaN(d) || d <= 0 || d > 100000) {
		errors.push("distance: musi być liczbą (0 < dystans <= 100000)");
	}

	if (!driver_id) {
		errors.push("driver_id: wymagane");
	}

	if (!vehicle_id) {
		errors.push("vehicle_id: wymagane");
	}

	try {
		if (driver_id) {
			const drv = await pool.query("SELECT id FROM drivers WHERE id = $1", [
				driver_id,
			]);

			if (drv.rows.length === 0) {
				errors.push("driver_id: nie znaleziono kierowcy");
			}
		}

		if (vehicle_id) {
			const veh = await pool.query("SELECT id FROM vehicles WHERE id = $1", [
				vehicle_id,
			]);

			if (veh.rows.length === 0) {
				errors.push("vehicle_id: nie znaleziono pojazdu");
			}
		}
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			message: "Błąd serwera",
		});
	}

	if (status === "trwa" && driver_id && vehicle_id) {
		try {
			const busy = await pool.query(
				`SELECT id
				 FROM trips
				 WHERE status = 'trwa'
				 AND (driver_id = $1 OR vehicle_id = $2)`,
				[driver_id, vehicle_id],
			);

			if (busy.rows.length > 0) {
				errors.push("driver/vehicle: kierowca lub pojazd ma już aktywną trasę");
			}
		} catch (err) {
			console.error(err);

			return res.status(500).json({
				message: "Błąd serwera",
			});
		}
	}

	if (errors.length) {
		return res.status(400).json({
			message: "Błędy walidacji",
			errors,
		});
	}

	next();
}

module.exports = {
	validateRegister,
	validateLogin,
	validateDriver,
	validateVehicle,
	validateTrip,
};
