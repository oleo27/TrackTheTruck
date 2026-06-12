import { useMemo } from "react";

function useAuth() {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	const isAdmin = role === "admin";

	const authHeaders = useMemo(
		() => ({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}),
		[token],
	);

	return { token, role, isAdmin, authHeaders };
}

export default useAuth;
