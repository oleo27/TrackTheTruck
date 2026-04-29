import { useEffect, useState } from "react";

function TripForm({ mode, trip, drivers, vehicles, onSave, onCancel }) {
	const [start, setStart] = useState("");
	const [finish, setFinish] = useState("");
	const [distance, setDistance] = useState("");
	const [driverId, setDriverId] = useState("");
	const [vehicleId, setVehicleId] = useState("");
	const [status, setStatus] = useState("trwa");

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

			<input
				placeholder="Start"
				value={start}
				onChange={(e) => setStart(e.target.value)}
			/>

			<input
				placeholder="Cel"
				value={finish}
				onChange={(e) => setFinish(e.target.value)}
			/>

			<input
				placeholder="Dystans"
				value={distance}
				onChange={(e) => setDistance(e.target.value)}
			/>

			<select value={driverId} onChange={(e) => setDriverId(e.target.value)}>
				<option value="">Wybierz kierowcę</option>
				{drivers.map((d) => (
					<option key={d.id} value={d.id}>
						{d.first_name} {d.last_name}
					</option>
				))}
			</select>

			<select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
				<option value="">Wybierz pojazd</option>
				{vehicles.map((v) => (
					<option key={v.id} value={v.id}>
						{v.registration_number}
					</option>
				))}
			</select>

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
