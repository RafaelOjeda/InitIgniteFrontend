import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthServiceInstance from './AuthService.tsx';

const UserRoute = () => {
	const [isUserLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				const response = await AuthServiceInstance.currentUser();

				if (response && response.message === "You are not logged in!") {
					setUserLoggedIn(false);
				} else { // If response is not the error message and exists, assume true. Otherwise false.
				setUserLoggedIn(!!response);
			}

			} catch (error) {
				console.error('Error checking user status:', error);
				setUserLoggedIn(false);
			}
		};

		checkUserStatus();
	}, []);

	if (isUserLoggedIn === null) {
		return <div>Loading...</div>;
	}

	if (!isUserLoggedIn) {
		sessionStorage.setItem('redirectUrl', location.pathname); // Store intended URL
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default UserRoute;