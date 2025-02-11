import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AuthServiceInstance from "./AuthService.tsx";

const ProtectedRoute = () => {
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAdminStatus = async () => {

			try {
				// const user = await AuthServiceInstance.currentUser(); // Get current user
				const adminStatus = await AuthServiceInstance.isAdmin({ uid: sessionStorage.getItem("login_token") }); // Pass UID
				setIsAdmin(adminStatus);
			} catch (error) {
				console.error("Error fetching admin status:", error);
				setIsAdmin(false);
			}
		};

		checkAdminStatus();
	}, []);

	if (!isAdmin) return <div>guest... </div>; // Redirect non-admins

	return <Outlet />; // Render admin-only content
};

export default ProtectedRoute;
