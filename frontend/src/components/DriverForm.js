import { useEffect, useState } from "react";

function DriverForm({ mode, driver, onSave, onCancel }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		if (mode === "edit" && driver) {
			setFirstName(driver.first_name);
			setLastName(driver.last_name);
		} else {
			setFirstName("");
			setLastName("");
		}
	}, [mode, driver]);

	const submit = () => {
		onSave({
			first_name: firstName,
			last_name: lastName,
		});
	};

	return (
		<div>
			<h3>{mode === "edit" ? "Edytuj kierowcę" : "Dodaj kierowcę"}</h3>

			<input
				placeholder="Imię"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>

			<input
				placeholder="Nazwisko"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>

			<button onClick={submit}>Zapisz</button>
			<button onClick={onCancel}>Anuluj</button>
		</div>
	);
}

export default DriverForm;
