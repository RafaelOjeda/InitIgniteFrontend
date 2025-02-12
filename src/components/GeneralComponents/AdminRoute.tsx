import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthServiceInstance from "./AuthService.tsx";

const AdminRoute = () => {
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const location = useLocation(); // For redirect URL

	useEffect(() => {
		const checkAdminStatus = async () => {
			try {
				const adminStatus = await AuthServiceInstance.isAdmin({ uid: sessionStorage.getItem("token") });
				setIsAdmin(adminStatus);
			} catch (error) {
				console.error("Error fetching admin status:", error);
				setIsAdmin(false); // Set to false on error
			}
		};

		checkAdminStatus();
	}, []);

	if (isAdmin === null) {
		return <div>Loading...</div>; // Loading state
	}

	if (!isAdmin) { // Explicitly check for false
		sessionStorage.setItem('redirectUrl', location.pathname); // Store intended URL
		return <Navigate to="/" />; // Redirect non-admins
	}

	return <Outlet />; // Render admin-only content
};

export default AdminRoute;