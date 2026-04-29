import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import VehiclesPage from "./pages/VehiclesPage";
import TripsPage from "./pages/TripsPage";

function App() {
	const [page, setPage] = useState("home");

	const goHome = () => setPage("home");
	const goDrivers = () => setPage("drivers");
	const goVehicles = () => setPage("vehicles");
	const goTrips = () => setPage("trips");

	if (page === "home") {
		return (
			<HomePage
				goDrivers={goDrivers}
				goVehicles={goVehicles}
				goTrips={goTrips}
			/>
		);
	}

	if (page === "drivers") {
		return <DriversPage goHome={goHome} />;
	}

	if (page === "vehicles") {
		return <VehiclesPage goHome={goHome} />;
	}

	if (page === "trips") {
		return <TripsPage goHome={goHome} />;
	}

	return null;
}

export default App;
