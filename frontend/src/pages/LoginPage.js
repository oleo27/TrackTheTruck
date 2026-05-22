import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!username || !password) {
			setError("Wszystkie pola są wymagane");
			return;
		}

		setError("");

		fetch("http://localhost:5000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(async (res) => {
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				}

				localStorage.setItem("token", data.token);

				localStorage.setItem("role", data.role);

				localStorage.setItem("username", data.username);

				alert("Zalogowano");
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div className="background">
			<div className="container auth-container">
				<h1 className="auth-title">Logowanie</h1>

				<form className="auth-form" onSubmit={handleSubmit}>
					<input
						className="auth-input"
						type="text"
						placeholder="Login"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<input
						className="auth-input"
						type="password"
						placeholder="Hasło"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <p className="auth-error">{error}</p>}

					<button className="auth-btn btn" type="submit">
						Zaloguj
					</button>
				</form>

				<p className="auth-switch">
					Nie masz konta? <Link to="/register">Zarejestruj się</Link>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
