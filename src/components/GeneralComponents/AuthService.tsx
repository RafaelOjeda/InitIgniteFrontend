import {SemesterData} from "../EditStudents/AddStudentForm.tsx";

export interface UserEmailAndPass {
	email : string,
	password : string
}

export interface UserData {
	email: string;
	password: string;
	name: string
}

export interface UserData {
	studentId: string;
	studentName: string;
	semester: string;
}

export interface FeelingCheckInToken {
	uid : string | null;
	feeling_rating : number;
	control_rating : number
}

export interface Email {
	email: string;
}

export interface SemesterID {
	semester_id: string;
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

	hasPermission = async (group : string, permission: string) => {
		const body = {
			group,
			permission
		}

		return fetch('http://localhost:3000/api/auth/hasPermission', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(
			response => response.json()
		).catch(() => console.error('There was some kind of issue!'))

	}

	getUsers = async (semester_id : SemesterID) => {
		return fetch('http://localhost:3000/api/get/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(semester_id)
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}



	addUser = async (userData : UserData) => {
		console.log("test")
		return fetch('http://localhost:3000/api/add/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
	}

	getSemesters = async () => {
		return fetch('http://localhost:3000/api/get/semesters', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	addSemester = async (semesterData : SemesterData) => {
		return fetch('http://localhost:3000/api/add/semester', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(semesterData)
		})
	}

	getTeacherStudents = async () => {
		return fetch('http://localhost:3000/api/get/teacher_students', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}

	getTeachers = async () => {
		return fetch('http://localhost:3000/api/get/teachers', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()
		).catch(() => console.error('There was some kind of issue!'))
	}
// ###################################################################################

}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;