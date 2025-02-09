import { useState, useEffect, FormEvent } from 'react';
import SkeletonForAllPages from '../GeneralComponents/SkeletonForAllPages';
import AuthServiceInstance, {AddSemesterStudent, UserData} from "../GeneralComponents/AuthService.tsx";
import { useNavigate } from 'react-router-dom';
import bg from "../../Assets/waves_bg.jpg";
import { TextField, Box, Typography, Button } from '@mui/material';

// Define types for semester and API response
interface Semester {
	semester_id: string;
	semester_start_date: string;
	semester_end_date: string;
	teachers: string[];
	teacher_students: string[];
}

interface SemesterResponse {
	status: string;
	data: Semester[];
}

const RegisterPage = () => {
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [semester_code, setSemesterCode] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [semesters, setSemesters] = useState<Semester[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem("login_token")) {
			navigate("/dashboard");
		}

		// Fetch available semesters
		const fetchSemesters = async () => {
			try {
				const response: SemesterResponse = await AuthServiceInstance.getSemesters();

				if (response.status === "success" && Array.isArray(response.data)) {
					setSemesters(response.data); // Store entire semester objects
				} else {
					setErrorMessage("Failed to fetch semesters. Try again later.");
				}
			} catch (error) {
				console.log(error);
				setErrorMessage("Error fetching semesters.");
			}
		};

		fetchSemesters();
	}, [navigate]);

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();

		if (!email || !password || !name || !semester_code) {
			setErrorMessage('Please fill out all the fields!');
			return;
		}

		// Validate semester_code
		const isValidSemester = semesters.some(semester => semester.semester_id === semester_code.trim());
		if (!isValidSemester) {
			setErrorMessage("Invalid Semester Code! Please enter a valid one.");
			return;
		}

		const userData: UserData = { email, password, name };

		try {
			// Register the user
			const userToken = await AuthServiceInstance.registerUser(userData);
			console.log(userToken);
			// console.log("User Token Response:", userToken);
			//
			// // Check if the response is valid
			// if (!userToken?.token) {
			// 	setErrorMessage("Account creation failed. Try again.");
			// 	return;
			// }

			// Store session data
			sessionStorage.setItem('login_token', userToken.token);
			sessionStorage.setItem('user_name', userToken.name);
			sessionStorage.setItem('user_email', userToken.email);

			// Add student to semester
			const semesterStudentData: AddSemesterStudent = {
				semester_id: semester_code.trim(),
				student_id: userToken.token, // Use `token` as UID
			};

			const addSemesterResponse = await AuthServiceInstance.addSemesterStudent(semesterStudentData);
			console.log(addSemesterResponse);
			if (addSemesterResponse.status !== "success") {
				setErrorMessage("Failed to add student to semester. Please contact support.");
				return;
			}

			// Redirect to dashboard upon success
			navigate("/dashboard");

		} catch (error) {
			console.error("Registration error:", error);
			setErrorMessage("Registration failed. Please try again.");
		}
	};


	return (
		<SkeletonForAllPages>
			<div style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: 'cover',
			}}>
				<form onSubmit={handleRegister}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							height: '100vh',
						}}
					>
						<Box sx={{
							width: '350px',
							mb: 4,
							bgcolor: 'white',
							display: 'inherit',
							flexDirection: 'inherit',
							alignItems: 'inherit',
							borderRadius: '15px',
							padding: '20px',
						}}>

							<Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
								Become a Teacher Student for Init Ignite
							</Typography>

							<TextField
								label="FIU email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								fullWidth
								margin="normal"
								size="small"
							/>
							<TextField
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								fullWidth
								margin="normal"
								size="small"
							/>
							<TextField
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								fullWidth
								margin="normal"
								size="small"
							/>
							<TextField
								label="Semester Code"
								value={semester_code}
								onChange={(e) => setSemesterCode(e.target.value)}
								fullWidth
								margin="normal"
								size="small"
							/>

							<Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
								We'll never share your personal data.
							</Typography>

							{errorMessage && (
								<Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
									{errorMessage}
								</Typography>
							)}

							<Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
								Create Account
							</Button>

							<Button onClick={() => navigate('/login')} variant="outlined" fullWidth sx={{ mt: 2 }}>
								Return to Login
							</Button>
						</Box>
					</Box>
				</form>
			</div>
		</SkeletonForAllPages>
	);
};

export default RegisterPage;
