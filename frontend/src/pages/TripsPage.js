import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TripForm from "../components/TripForm";
import useAuth from "../hooks/useAuth";

function TripsPage() {
	const navigate = useNavigate();
	const { isAdmin, authHeaders } = useAuth();

	const [trips, setTrips] = useState([]);
	const [drivers, setDrivers] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTrip, setSelectedTrip] = useState(null);

	// LOAD DATA
	const loadTrips = () => {
		fetch("http://localhost:5000/trips", {
			headers: authHeaders,
		})
			.then((res) => res.json())
			.then(setTrips);
	};

	const loadDrivers = () => {
		fetch("http://localhost:5000/drivers", {
			headers: authHeaders,
		})
			.then((res) => res.json())
			.then(setDrivers);
	};

	const loadVehicles = () => {
		fetch("http://localhost:5000/vehicles", {
			headers: authHeaders,
		})
			.then((res) => res.json())
			.then(setVehicles);
	};

	useEffect(() => {
		loadTrips();
		loadDrivers();
		loadVehicles();
	}, []);

	// MODAL
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

	// SAVE (CREATE / UPDATE)
	const saveTrip = (data) => {
		const url = selectedTrip
			? `http://localhost:5000/trips/${selectedTrip.id}`
			: "http://localhost:5000/trips";

		const method = selectedTrip ? "PUT" : "POST";

		fetch(url, {
			method,
			headers: authHeaders,
			body: JSON.stringify(data),
		}).then(() => {
			closeModal();
			loadTrips();
		});
	};

	// DELETE
	const deleteTrip = (id) => {
		fetch(`http://localhost:5000/trips/${id}`, {
			method: "DELETE",
			headers: authHeaders,
		}).then(loadTrips);
	};

	// LOGOUT
	const logout = () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<div className="wrapper">
			<div className="container">
				<button className="btn-logout" onClick={logout}>
					Logout
				</button>

				<div className="page-head-row">
					<h2 className="page-title">Trasy</h2>

					<div className="page-head-action-buttons">
						<button className="back-btn btn" onClick={() => navigate("/")}>
							← Powrót
						</button>

						{isAdmin && (
							<button className="add-btn btn" onClick={openAddModal}>
								+ Dodaj trasę
							</button>
						)}
					</div>
				</div>

				<div className="page-list">
					{trips.map((t) => (
						<div className="page-row" key={t.id}>
							<div className="page-row-details">
								<strong>{t.start_location}</strong> → {t.finish_location}
								<div>Status: {t.status}</div>
							</div>

							{isAdmin && (
								<div className="page-row-action-buttons">
									<button
										className="edit-btn btn"
										onClick={() => openEditModal(t)}
									>
										Edytuj
									</button>

									<button
										className="del-btn btn"
										onClick={() => deleteTrip(t.id)}
									>
										Usuń
									</button>
								</div>
							)}
						</div>
					))}
				</div>

				{isAdmin && isModalOpen && (
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
		</div>
	);
}

export default TripsPage;
