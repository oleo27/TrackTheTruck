import { useEffect, useState } from "react";

function TripForm({ mode, trip, drivers, vehicles, onSave, onCancel }) {
	const [start, setStart] = useState("");
	const [finish, setFinish] = useState("");
	const [distance, setDistance] = useState("");
	const [driverId, setDriverId] = useState("");
	const [vehicleId, setVehicleId] = useState("");
	const [status, setStatus] = useState("trwa");

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	useEffect(() => {
		const e = {};
		if (touched.start && !start) e.start = "Pole wymagane";
		else if (start && (start.length < 2 || start.length > 100))
			e.start = "Start: 2-100 znaków";

		if (touched.finish && !finish) e.finish = "Pole wymagane";
		else if (finish && (finish.length < 2 || finish.length > 100))
			e.finish = "Cel: 2-100 znaków";

		const d = Number(distance);
		if (touched.distance && !distance) e.distance = "Pole wymagane";
		else if (distance && (isNaN(d) || d <= 0 || d > 100000))
			e.distance = "Dystans musi być liczbą (0 < dystans <= 100000)";

		if (touched.driverId && !driverId) e.driverId = "Wybierz kierowcę";
		if (touched.vehicleId && !vehicleId) e.vehicleId = "Wybierz pojazd";

		setErrors(e);
	}, [start, finish, distance, driverId, vehicleId, touched]);

	useEffect(() => {
		if (mode === "edit" && trip) {
			setStart(trip.start_location);
			setFinish(trip.finish_location);
			setDistance(trip.distance);
			setDriverId(trip.driver_id);
			setVehicleId(trip.vehicle_id);
			setStatus(trip.status);
		} else {
			setStart("");
			setFinish("");
			setDistance("");
			setDriverId("");
			setVehicleId("");
			setStatus("trwa");
		}
	}, [mode, trip]);

	const submit = () => {
		setTouched({
			start: true,
			finish: true,
			distance: true,
			driverId: true,
			vehicleId: true,
		});
		if (Object.keys(errors).length > 0) return;
		onSave({
			start_location: start,
			finish_location: finish,
			distance: Number(distance),
			driver_id: Number(driverId),
			vehicle_id: Number(vehicleId),
			status,
		});
	};

	return (
		<div>
			<h3>{mode === "edit" ? "Edytuj trasę" : "Dodaj trasę"}</h3>

			<div>
				<input
					placeholder="Start"
					value={start}
					onChange={(e) => setStart(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, start: true }))}
					className={errors.start ? "invalid" : touched.start ? "valid" : ""}
				/>
				{errors.start && <div className="input-error">{errors.start}</div>}
			</div>

			<div>
				<input
					placeholder="Cel"
					value={finish}
					onChange={(e) => setFinish(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, finish: true }))}
					className={errors.finish ? "invalid" : touched.finish ? "valid" : ""}
				/>
				{errors.finish && <div className="input-error">{errors.finish}</div>}
			</div>

			<div>
				<input
					placeholder="Dystans"
					value={distance}
					onChange={(e) => setDistance(e.target.value)}
					onBlur={() => setTouched((t) => ({ ...t, distance: true }))}
					className={
						errors.distance ? "invalid" : touched.distance ? "valid" : ""
					}
				/>
				{errors.distance && (
					<div className="input-error">{errors.distance}</div>
				)}
			</div>

			<select
				value={driverId}
				onChange={(e) => setDriverId(e.target.value)}
				onBlur={() => setTouched((t) => ({ ...t, driverId: true }))}
				className={
					errors.driverId ? "invalid" : touched.driverId ? "valid" : ""
				}
			>
				<option value="">Wybierz kierowcę</option>
				{drivers.map((d) => (
					<option key={d.id} value={d.id}>
						{d.first_name} {d.last_name}
					</option>
				))}
			</select>
			{errors.driverId && <div className="input-error">{errors.driverId}</div>}

			<select
				value={vehicleId}
				onChange={(e) => setVehicleId(e.target.value)}
				onBlur={() => setTouched((t) => ({ ...t, vehicleId: true }))}
				className={
					errors.vehicleId ? "invalid" : touched.vehicleId ? "valid" : ""
				}
			>
				<option value="">Wybierz pojazd</option>
				{vehicles.map((v) => (
					<option key={v.id} value={v.id}>
						{v.registration_number}
					</option>
				))}
			</select>
			{errors.vehicleId && (
				<div className="input-error">{errors.vehicleId}</div>
			)}

			<select value={status} onChange={(e) => setStatus(e.target.value)}>
				<option value="trwa">Trwa</option>
				<option value="zakończona">Zakończona</option>
			</select>

			<button onClick={submit}>Zapisz</button>
			<button onClick={onCancel}>Anuluj</button>
		</div>
	);
}

export default TripForm;
