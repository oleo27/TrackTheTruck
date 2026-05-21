import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VehicleForm from "../components/VehicleForm";

function VehiclesPage() {
	const navigate = useNavigate();

	const [vehicles, setVehicles] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVehicle, setSelectedVehicle] = useState(null);

	const loadVehicles = () => {
		fetch("http://localhost:5000/vehicles")
			.then((res) => res.json())
			.then(setVehicles);
	};

	useEffect(() => {
		loadVehicles();
	}, []);

	const openAddModal = () => {
		setSelectedVehicle(null);
		setIsModalOpen(true);
	};

	const openEditModal = (vehicle) => {
		setSelectedVehicle(vehicle);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedVehicle(null);
	};

	const saveVehicle = (data) => {
		if (selectedVehicle) {
			fetch(`http://localhost:5000/vehicles/${selectedVehicle.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(() => {
				closeModal();
				loadVehicles();
			});
		} else {
			fetch("http://localhost:5000/vehicles", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(() => {
				closeModal();
				loadVehicles();
			});
		}
	};

	const deleteVehicle = (id) => {
		fetch(`http://localhost:5000/vehicles/${id}`, {
			method: "DELETE",
		}).then(loadVehicles);
	};

	return (
		<div className="wrapper">
			<div className="container">
				<div className="page-head-row">
					<h2 className="page-title">Pojazdy</h2>

					<div className="page-head-action-buttons">
						<button className="back-btn btn" onClick={() => navigate("/")}>
							←
						</button>

						<button className="add-btn btn" onClick={openAddModal}>
							+ Dodaj pojazd
						</button>
					</div>
				</div>

				<div className="page-list">
					{vehicles.map((v) => (
						<div className="page-row" key={v.id}>
							<div className="page-row-details">
								<p>
									{v.brand} {v.registration_number}
								</p>
							</div>

							<div className="page-row-action-buttons">
								<button
									className="edit-btn btn"
									onClick={() => openEditModal(v)}
								>
									Edytuj
								</button>

								<button
									className="del-btn btn"
									onClick={() => deleteVehicle(v.id)}
								>
									Usuń
								</button>
							</div>
						</div>
					))}
				</div>

				{isModalOpen && (
					<div>
						<div>
							<VehicleForm
								mode={selectedVehicle ? "edit" : "create"}
								driver={selectedVehicle}
								onSave={saveVehicle}
								onCancel={closeModal}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default VehiclesPage;
