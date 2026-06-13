import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	useEffect(() => {
		const e = {};

		if (touched.username && !username) {
			e.username = "Pole wymagane";
		} else if (username && (username.length < 3 || username.length > 30)) {
			e.username = "Login musi mieć od 3 do 30 znaków";
		}

		if (touched.password && !password) {
			e.password = "Pole wymagane";
		} else if (password && (password.length < 6 || password.length > 128)) {
			e.password = "Hasło musi mieć od 6 do 128 znaków";
		}

		setErrors(e);
	}, [username, password, touched]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setTouched({
			username: true,
			password: true,
		});

		if (Object.keys(errors).length > 0) {
			setError("Formularz zawiera błędy");
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

				navigate("/");
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
					<div>
						<input
							className={`auth-input ${
								errors.username ? "invalid" : touched.username ? "valid" : ""
							}`}
							type="text"
							placeholder="Login"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onBlur={() =>
								setTouched((t) => ({
									...t,
									username: true,
								}))
							}
						/>

						{errors.username && (
							<div className="input-error">{errors.username}</div>
						)}
					</div>

					<div>
						<input
							className={`auth-input ${
								errors.password ? "invalid" : touched.password ? "valid" : ""
							}`}
							type="password"
							placeholder="Hasło"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onBlur={() =>
								setTouched((t) => ({
									...t,
									password: true,
								}))
							}
						/>

						{errors.password && (
							<div className="input-error">{errors.password}</div>
						)}
					</div>

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
