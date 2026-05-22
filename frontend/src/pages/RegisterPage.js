import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!username || !password || !confirmPassword) {
			setError("Wszystkie pola są wymagane");
			return;
		}

		if (password.length < 6) {
			setError("Hasło musi mieć minimum 6 znaków");
			return;
		}

		if (password !== confirmPassword) {
			setError("Hasła nie są takie same");
			return;
		}

		setError("");

		fetch("http://localhost:5000/auth/register", {
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

				alert("Konto utworzone");

				setUsername("");
				setPassword("");
				setConfirmPassword("");
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div className="background">
			<div className="container auth-container">
				<h1 className="auth-title">Rejestracja</h1>

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

					<input
						className="auth-input"
						type="password"
						placeholder="Powtórz hasło"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{error && <p className="auth-error">{error}</p>}

					<button className="auth-btn btn" type="submit">
						Zarejestruj się
					</button>
				</form>

				<p className="auth-switch">
					Masz już konto? <Link to="/login">Zaloguj się</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
