import { useEffect, useState } from "react";

function DriverForm({ mode, driver, onSave, onCancel }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż'\-\s]+$/;

	useEffect(() => {
		const e = {};
		if (touched.firstName && !firstName) e.firstName = "Pole wymagane";
		else if (firstName && (firstName.length < 2 || firstName.length > 50))
			e.firstName = "Imię musi mieć od 2 do 50 znaków";
		else if (firstName && !nameRegex.test(firstName))
			e.firstName = "Imię nie może zawierać cyfr";

		if (touched.lastName && !lastName) e.lastName = "Pole wymagane";
		else if (lastName && (lastName.length < 2 || lastName.length > 50))
			e.lastName = "Nazwisko musi mieć od 2 do 50 znaków";
		else if (lastName && !nameRegex.test(lastName))
			e.lastName = "Nazwisko nie może zawierać cyfr";

		setErrors(e);
	}, [firstName, lastName, touched]);

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
		setTouched({ firstName: true, lastName: true });
		if (Object.keys(errors).length > 0) return;
		onSave({
			first_name: firstName,
			last_name: lastName,
		});
	};

	return (
		<div>
			<h3>{mode === "edit" ? "Edytuj kierowcę" : "Dodaj kierowcę"}</h3>

			<div>
				<input
					placeholder="Imię"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
					className={
						errors.firstName ? "invalid" : touched.firstName ? "valid" : ""
					}
				/>
				{errors.firstName && (
					<div className="input-error">{errors.firstName}</div>
				)}
			</div>

			<div>
				<input
					placeholder="Nazwisko"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
					className={
						errors.lastName ? "invalid" : touched.lastName ? "valid" : ""
					}
				/>
				{errors.lastName && (
					<div className="input-error">{errors.lastName}</div>
				)}
			</div>

			<button onClick={submit}>Zapisz</button>
			<button onClick={onCancel}>Anuluj</button>
		</div>
	);
}

export default DriverForm;
