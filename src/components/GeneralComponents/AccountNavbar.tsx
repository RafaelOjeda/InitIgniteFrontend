import AuthServiceInstance from "./AuthService";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {Container, Nav, Navbar } from "react-bootstrap";

const AccountNavbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		const userEmail = {
			'email': sessionStorage.getItem("user_email")
		}

		AuthServiceInstance.logoutUser(userEmail);
		//console.log(response)

		sessionStorage.clear();
		navigate("/login");

	}

	return (
		<Navbar expand="lg" className="py-3" style={{ backgroundColor: "#1a1a1a" }}>
			<Container>
				<Navbar.Toggle aria-controls="navbarNav" />
				<Navbar.Collapse id="navbarNav">
					<Nav className="mx-auto">
						<Nav.Item>
							<Nav.Link as={RouterLink} to="/" className="text-white">Home</Nav.Link>
						</Nav.Item>

						{sessionStorage.getItem("name") ? (
							<>
								<Nav.Item>
									<Nav.Link as={RouterLink} to="/dashboard" className="text-white">Dashboard</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link onClick={handleLogout} className="text-white">Logout</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<span className="navbar-text text-white">Hello, {sessionStorage.getItem("name")}</span>
								</Nav.Item>
							</>
						) : (
							<>
								<Nav.Item>
									<Nav.Link as={RouterLink} to="/login" className="text-white">Sign in</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link as={RouterLink} to="/register" className="text-white">Create account</Nav.Link>
								</Nav.Item>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AccountNavbar;