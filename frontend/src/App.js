import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import VehiclesPage from "./pages/VehiclesPage";
import TripsPage from "./pages/TripsPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* PUBLIC */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* PROTECTED */}
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/drivers"
					element={
						<ProtectedRoute>
							<DriversPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/vehicles"
					element={
						<ProtectedRoute>
							<VehiclesPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/trips"
					element={
						<ProtectedRoute>
							<TripsPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
