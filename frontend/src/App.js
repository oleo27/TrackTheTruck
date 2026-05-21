import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import VehiclesPage from "./pages/VehiclesPage";
import TripsPage from "./pages/TripsPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/drivers" element={<DriversPage />} />

				<Route path="/vehicles" element={<VehiclesPage />} />

				<Route path="/trips" element={<TripsPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
