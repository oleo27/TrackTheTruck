function HomePage({ goDrivers, goVehicles, goTrips }) {
	return (
		<div className="background">
			<div className="container home">
				<h1 className="home-title">TrackTheTruck</h1>

				<div className="home-card-container">
					<div className="home-card" onClick={goDrivers}>
						<h2 className="home-card-title">Kierowcy</h2>
						<p className="home-card-lead">Zarządzaj kierowcami</p>
					</div>

					<div className="home-card" onClick={goVehicles}>
						<h2 className="home-card-title">Pojazdy</h2>
						<p className="home-card-lead">Zarządzaj flotą</p>
					</div>

					<div className="home-card" onClick={goTrips}>
						<h2 className="home-card-title">Trasy</h2>
						<p className="home-card-lead">Przegląd tras</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
