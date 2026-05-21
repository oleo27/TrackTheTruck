import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DriverForm from "../components/DriverForm";

function DriversPage() {
	const navigate = useNavigate();

	const [drivers, setDrivers] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDriver, setSelectedDriver] = useState(null);

	const loadDrivers = () => {
		fetch("http://localhost:5000/drivers")
			.then((res) => res.json())
			.then(setDrivers);
	};

	useEffect(() => {
		loadDrivers();
	}, []);

	const openAddModal = () => {
		setSelectedDriver(null);
		setIsModalOpen(true);
	};

	const openEditModal = (driver) => {
		setSelectedDriver(driver);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedDriver(null);
	};

	const saveDriver = (data) => {
		if (selectedDriver) {
			fetch(`http://localhost:5000/drivers/${selectedDriver.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(() => {
				closeModal();
				loadDrivers();
			});
		} else {
			fetch("http://localhost:5000/drivers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(() => {
				closeModal();
				loadDrivers();
			});
		}
	};

	const deleteDriver = (id) => {
		fetch(`http://localhost:5000/drivers/${id}`, {
			method: "DELETE",
		}).then(loadDrivers);
	};

	return (
		<div className="wrapper">
			<div className="container">
				<div className="page-head-row">
					<h2 className="page-title">Kierowcy</h2>

					<div className="page-head-action-buttons">
						<button className="back-btn btn" onClick={() => navigate("/")}>
							← Powrót
						</button>

						<button className="add-btn btn" onClick={openAddModal}>
							+ Dodaj kierowcę
						</button>
					</div>
				</div>

				<div className="page-list">
					{drivers.map((d) => (
						<div className="page-row" key={d.id}>
							<div className="page-row-details">
								<p>
									{d.first_name} {d.last_name}
								</p>
							</div>

							<div className="page-row-action-buttons">
								<button
									className="edit-btn btn"
									onClick={() => openEditModal(d)}
								>
									Edytuj
								</button>

								<button
									className="del-btn btn"
									onClick={() => deleteDriver(d.id)}
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
							<DriverForm
								mode={selectedDriver ? "edit" : "create"}
								driver={selectedDriver}
								onSave={saveDriver}
								onCancel={closeModal}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default DriversPage;
