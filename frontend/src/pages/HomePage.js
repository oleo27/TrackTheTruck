import { useNavigate } from "react-router-dom";

function HomePage() {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("username");

		navigate("/login");
	};

	return (
		<div className="background">
			<div className="container home">
				<button className="btn-logout" onClick={logout}>
					Logout
				</button>
				<h1 className="home-title">TrackTheTruck</h1>

				<div className="home-card-container">
					<div className="home-card" onClick={() => navigate("/drivers")}>
						<h2 className="home-card-title">Kierowcy</h2>

						<p className="home-card-lead">Zarządzaj kierowcami</p>
					</div>

					<div className="home-card" onClick={() => navigate("/vehicles")}>
						<h2 className="home-card-title">Pojazdy</h2>

						<p className="home-card-lead">Zarządzaj flotą</p>
					</div>

					<div className="home-card" onClick={() => navigate("/trips")}>
						<h2 className="home-card-title">Trasy</h2>

						<p className="home-card-lead">Przegląd tras</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
