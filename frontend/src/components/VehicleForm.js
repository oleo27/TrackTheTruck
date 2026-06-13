import { useEffect, useState } from "react";

function VehicleForm({ mode, vehicle, onSave, onCancel }) {
	const [registration, setRegistration] = useState("");
	const [brand, setBrand] = useState("");

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const regRegex = /^([A-Z]{3}\s[A-Z0-9]{4}|[A-Z]{2}\s[A-Z0-9]{5})$/;

	useEffect(() => {
		const e = {};
		if (touched.registration && !registration) e.registration = "Pole wymagane";
		else if (registration && !regRegex.test(registration))
			e.registration = "Nieprawidłowy format rejestracji";

		if (touched.brand && !brand) e.brand = "Pole wymagane";
		else if (brand && (brand.length < 2 || brand.length > 50))
			e.brand = "Marka: 2-50 znaków";

		setErrors(e);
	}, [registration, brand, touched]);

	useEffect(() => {
		if (mode === "edit" && vehicle) {
			setRegistration(vehicle.registration_number);
			setBrand(vehicle.brand);
		} else {
			setRegistration("");
			setBrand("");
		}
	}, [mode, vehicle]);

	const submit = () => {
		setTouched({ registration: true, brand: true });
		if (Object.keys(errors).length > 0) return;
		onSave({
			registration_number: registration,
			brand: brand,
		});
	};

	return (
		<div>
			<h3>{mode === "edit" ? "Edytuj pojazd" : "Dodaj pojazd"}</h3>

			<div>
				<input
					placeholder="Rejestracja"
					value={registration}
					onChange={(e) => setRegistration(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, registration: true }))}
					className={
						errors.registration
							? "invalid"
							: touched.registration
								? "valid"
								: ""
					}
				/>
				{errors.registration && (
					<div className="input-error">{errors.registration}</div>
				)}
			</div>

			<div>
				<input
					placeholder="Marka"
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, brand: true }))}
					className={errors.brand ? "invalid" : touched.brand ? "valid" : ""}
				/>
				{errors.brand && <div className="input-error">{errors.brand}</div>}
			</div>

			<button onClick={submit}>Zapisz</button>
			<button onClick={onCancel}>Anuluj</button>
		</div>
	);
}

export default VehicleForm;
