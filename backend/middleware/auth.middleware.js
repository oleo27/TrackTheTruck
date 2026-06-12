const jwt = require("jsonwebtoken");

/**
 * Weryfikuje token JWT z nagłówka Authorization.
 * Dołącza zdekodowany payload do req.user.
 */
const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return res.status(401).json({ message: "Brak tokenu autoryzacji" });
	}

	// Obsługuje format "Bearer <token>"
	const token = authHeader.startsWith("Bearer ")
		? authHeader.slice(7)
		: authHeader;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // { id, role }
		next();
	} catch {
		return res.status(401).json({ message: "Nieprawidłowy lub wygasły token" });
	}
};

/**
 * Zezwala tylko użytkownikom z rolą "admin".
 * Musi być używany po verifyToken.
 */
const requireAdmin = (req, res, next) => {
	if (req.user?.role !== "admin") {
		return res
			.status(403)
			.json({ message: "Brak uprawnień – wymagana rola administratora" });
	}
	next();
};

module.exports = { verifyToken, requireAdmin };