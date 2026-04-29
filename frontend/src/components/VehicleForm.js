import { useEffect, useState } from "react";

function VehicleForm({ mode, vehicle, onSave, onCancel }) {
	const [registration, setRegistration] = useState("");
	const [brand, setBrand] = useState("");

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
		onSave({
			registration_number: registration,
			brand: brand,
		});
	};

	return (
		<div>
			<h3>{mode === "edit" ? "Edytuj pojazd" : "Dodaj pojazd"}</h3>

			<input
				placeholder="Rejestracja"
				value={registration}
				onChange={(e) => setRegistration(e.target.value)}
			/>

			<input
				placeholder="Marka"
				value={brand}
				onChange={(e) => setBrand(e.target.value)}
			/>

			<button onClick={submit}>Zapisz</button>
			<button onClick={onCancel}>Anuluj</button>
		</div>
	);
}

export default VehicleForm;
