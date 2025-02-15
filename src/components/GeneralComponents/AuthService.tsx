import {Semester} from '../EditStudents/AddStudentToSemesterForm.tsx';

interface ClassroomRequest {
	classroom_id: string;
}

interface AddTeacherStudentToClassroomRequest extends ClassroomRequest {
	teacher_student_id: string;
}

interface User {
	status: "success" | "error"; // Status can be either "success" or "error"
	data: {
		teacher_ids: string[]; // Array of teacher IDs
		active_semesters: string[]; // Array of active semesters (empty in this case)
		name: string; // Name of the user
		semester_id: string[]; // Array of semester IDs
		email: string; // Email of the user
	};
}

export interface UserEmailAndPass {
	email : string,
	password : string
}

export interface UserData {
	email: string;
	password: string;
	name: string
}

export interface UserDataSemester {
	studentId: string;
	studentName: string;
	semester: string;
}


export interface Email {
	email: string;
}

export interface SemesterID {
	semester_id: string;
}

export interface AddSemesterStudent {
	semester_id: string;
	student_id: string;
}

export interface UserUID {
	uid: string | null;
}

interface TeacherFields {
	Name: string;
	"School Name": string;
	"School Address": string;
	"Phone Number": string;
	"Preferred Day": string[];
	"Estimate Amount of Students Attending the Class": number;
	"Preferred Day copy"?: string[]; // Optional property
	"Any additional comments that are not covered with the above"?: string; // Optional
	"Preferred Language to Learn": string;
	"Available Time for Preferred Days": string[];
	"Name copy"?: string; // Optional
	// ... other fields as needed
}

interface Teacher {
	id: string;
	fields: TeacherFields;
}

interface TeacherResponse {
	status: "success" | "error"; // Use a union type for status
	teacher?: Teacher; // Teacher is optional in case of error
	message?: string; // Error message
}

class AuthService {

	currentUser = async () => {

		return fetch('http://localhost:3000/api/auth/currentUser', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	loginUser = async (userEmailAndPass : UserEmailAndPass) => {

		return fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userEmailAndPass)
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	registerUser = async (userData : UserData) => {
		return fetch('http://localhost:3000/api/auth/register', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
		.then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	logoutUser = async () => {
		return fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	resetUserPassword = async (userEmail : Email) => {
		return fetch('http://localhost:3000/api/auth/reset', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				userEmail
			)
		})
		.then(response => {
			response.json()
			console.log(response)
		})
	}

	addUser = async (userData : UserData) => {
		return fetch('http://localhost:3000/api/add/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
	}

	addSemester = async (semesterData : Semester) => {
		return fetch('http://localhost:3000/api/add/semester', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(semesterData)
		})
	}

	addSemesterStudent = async (semesterData: AddSemesterStudent) => {
		try {
			const response = await fetch('http://localhost:3000/api/add/semester/student', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(semesterData)
			});

			if (!response.ok) {
				throw new Error(`Failed to add student: ${response.status}`);
			}


			 // Ensure JSON is parsed
			return await response.json();
		} catch (error) {
			console.error('Error adding student to semester:', error);
			return { status: "error", message: error.message };
		}
	};

	getUser = async (user_id : User) => {
		return fetch('http://localhost:3000/api/get/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user_id)
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of getUser error:', user_id));
	}

	getUsers = async (semester_id : SemesterID) => {
		return fetch('http://localhost:3000/api/get/users', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(semester_id)
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	getSemesters = async () => {
		return fetch('http://localhost:3000/api/get/semesters', {
			method: 'GET', // ✅ Change from 'POST' to 'GET'
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.catch(error => console.error('Error fetching semesters:', error));
	};

	getTeacherStudents = async () => {
		return fetch('http://localhost:3000/api/get/teacher_students', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	getTeachers = async () => {
		return fetch('http://localhost:3000/api/get/teachers', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	getTeacher = async (teacherId: string): Promise<Teacher | null> => {
		try {
			const response = await fetch('http://localhost:3000/api/get/teacher', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ teacher_id: teacherId }),
			});

			if (!response.ok) {
				const errorData: TeacherResponse = await response.json(); // Type the error response
				throw new Error(`${response.status} ${response.statusText}: ${errorData.message || 'Error fetching teacher'}`);
			}

			const data: TeacherResponse = await response.json(); // Type the successful response

			if (data.status === "success" && data.teacher) { // Check for success and existence of teacher
				return data.teacher;
			} else {
				throw new Error("Invalid response from server"); // Handle unexpected response
			}


		} catch (error) {
			console.error('Error fetching teacher:', error);
			throw error; // Re-throw the error
		}
	};

	getClassroom = async (classroomRequest: ClassroomRequest) => {
		try {
			const response = await fetch('http://localhost:3000/api/get/classroom', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(classroomRequest) // Send in the body for GET requests
			});

			if (!response.ok) {
				throw new Error(`Failed to get classroom: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Error getting classroom:', error);
			return { status: "error", message: error.message };
		}
	};

	addTeacherStudentToClassroom = async (request: { teacher_id: string; semester_id: string; teacher_student_id: string }) => {
		console.log(request)

		try {
			const response = await fetch('http://localhost:3000/api/add/classroom/teacher_students', { // Correct URL
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});
			console.log(response)
			if (!response.ok) {
				try { // Attempt to parse JSON error response
					const errorData = await response.json();
					return { // Return error object
						status: "error",
						message: errorData?.message || response.statusText || "Server error"
					};
				} catch (jsonError) { // If JSON parsing fails, return generic error
					console.log(jsonError);
					return {
						status: "error",
						message: response.statusText || "Server error"
					};
				}
			}

			return await response.json(); // Return success JSON
		} catch (error) { // Catch network errors etc.
			console.error('Error adding teacher/student to classroom:', error);
			return { status: "error", message: error.message || "Network error" }; // Return error object
		}
	};

	deleteTeacherStudentFromClassroom = async (request: AddTeacherStudentToClassroomRequest) => {
		try {
			const response = await fetch('http://localhost:3000/api/delete/classroom/teacher_students', {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});

			if (!response.ok) {
				throw new Error(`Failed to delete teacher/student from classroom: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Error deleting teacher/student from classroom:', error);
			return { status: "error", message: error.message };
		}
	};

	isAdmin = async (request: UserUID): Promise<boolean | null> => {
		console.log("isAdmin triggered")
		try {
			const response = await fetch('http://localhost:3000/api/auth/is_admin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request), // Send the request object directly
			});

			if (!response.ok) {
				const errorText = await response.text(); // Get error message from server
				let errorMessage = `Server returned ${response.status}: ${errorText}`;

				// Check for specific status codes (e.g., 401, 403) for custom error handling
				if (response.status === 401) {
					errorMessage = "Unauthorized. Please log in.";
				} else if (response.status === 403) {
					errorMessage = "Forbidden. You do not have admin access.";
				}

				throw new Error(errorMessage); // Throw the more specific error
			}

			const data = await response.json();

			if (data && typeof data.isAdmin === 'boolean') {
				return data.isAdmin;
			} else {
				console.error("Invalid response from /is_admin:", data);
				return false; // Or throw an error if you prefer
			}

		} catch (error: any) { // Type the error as any or Error
			console.error("Error checking admin status:", error.message); // Log the error message
			if (error.message.includes("NetworkError")) { // Example: check if the server is down
				// Handle network error (e.g., display a "server not available" message)
			}
			return null;
		}
	};

}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;