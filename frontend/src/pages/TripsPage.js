import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TripForm from "../components/TripForm";

function TripsPage() {
	const navigate = useNavigate();

	const [trips, setTrips] = useState([]);
	const [drivers, setDrivers] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTrip, setSelectedTrip] = useState(null);

	const loadTrips = () => {
		fetch("http://localhost:5000/trips")
			.then((res) => res.json())
			.then(setTrips);
	};

	const loadDrivers = () => {
		fetch("http://localhost:5000/drivers")
			.then((res) => res.json())
			.then(setDrivers);
	};

	const loadVehicles = () => {
		fetch("http://localhost:5000/vehicles")
			.then((res) => res.json())
			.then(setVehicles);
	};

	useEffect(() => {
		loadTrips();
		loadDrivers();
		loadVehicles();
	}, []);

	const openAddModal = () => {
		setSelectedTrip(null);
		setIsModalOpen(true);
	};

	const openEditModal = (trip) => {
		setSelectedTrip(trip);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedTrip(null);
	};

	const saveTrip = (data) => {
		if (selectedTrip) {
			fetch(`http://localhost:5000/trips/${selectedTrip.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(() => {
				closeModal();
				loadTrips();
			});
		} else {
			fetch("http://localhost:5000/trips", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(() => {
				closeModal();
				loadTrips();
			});
		}
	};

	const deleteTrip = (id) => {
		fetch(`http://localhost:5000/trips/${id}`, {
			method: "DELETE",
		}).then(loadTrips);
	};

	return (
		<div>
			<h2>Trasy</h2>

			<button onClick={() => navigate("/")}>Powrót</button>

			<button onClick={openAddModal}>Dodaj trasę</button>

			{trips.map((t) => (
				<div key={t.id}>
					<strong>{t.start_location}</strong>
					{" → "}
					{t.finish_location}
					{" | "}
					status: {t.status}
					<button onClick={() => openEditModal(t)}>Edytuj</button>
					<button onClick={() => deleteTrip(t.id)}>Usuń</button>
				</div>
			))}

			{isModalOpen && (
				<div className="modal-overlay">
					<div className="modal-content">
						<TripForm
							mode={selectedTrip ? "edit" : "create"}
							trip={selectedTrip}
							drivers={drivers}
							vehicles={vehicles}
							onSave={saveTrip}
							onCancel={closeModal}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default TripsPage;
