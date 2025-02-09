import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {StudentData} from "./StudentList.tsx";
import AuthServiceInstance, {UserDataSemester} from "../GeneralComponents/AuthService.tsx";

export interface SemesterData {
    status: string;
    data: Semester[];
}

export interface Semester {
    semester_id: string;
    semester_start_date: string;
    semester_end_date: string;
    teachers?: string[]; // Optional array of teacher IDs
    teacher_students?: string[]; // Optional array of student IDs
}

export interface Student {
    id: string;
    email: string;
    school: string;
}

export interface SemesterUserData {
    status: string;
    data: {
        semester_id: string;
        students: Student[];
    }[];
}

const AddStudentToSemesterForm = () => {

    const [semester, setSemester] = useState<Semester[]>([]);
    const [students, setStudent] = useState<Student[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [selectedStudentName, setSelectedStudentName] = useState<string | null>(null);
    const [isStudentDisabled, setIsStudentDisabled] = useState(true); // Controls the "Student" dropdown

    const handleSemesterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSemester = e.target.value;
        setIsStudentDisabled(!selectedSemester); // Enable "Student" dropdown if a semester is selected

        if (selectedSemester) {
            try {
                const response: StudentData = await AuthServiceInstance.getTeacherStudents();
                const user: SemesterUserData = await AuthServiceInstance.getUsers({
                    semester_id: selectedSemester,
                });

                if (response.status === 'success' && user.status === 'success') {
                    // Check if the selected semester matches
                    if (user.data.semester_id === selectedSemester) {
                        const excludedStudentIds = user.data.students.map((s) => s.id);

                        // Filter students not in the selected semester
                        const filteredStudents = response.data.filter(
                            (student) => !excludedStudentIds.includes(student.id)
                        );

                        setStudent(filteredStudents);
                    } else {
                        console.error('Selected semester not found in user data.');
                    }
                } else {
                    console.error('Failed to fetch data.');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        } else {
            setStudent([]); // Clear students if no semester is selected
        }
    };


    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedStudentId(selectedId);

        const student = students.find((s) => s.id === selectedId);
        setSelectedStudentName(student ? student.name : null);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);

        const selectedSemester = formData.get('semester');
        const userSemester : UserDataSemester = {
            studentId: selectedStudentId,
            studentName: selectedStudentName,
            semester: selectedSemester
        };

        AuthServiceInstance.addUser(userSemester);
        console.log('Selected Semester:', selectedSemester);
        console.log('Selected Student ID:', selectedStudentId);
        console.log('Selected Student Name:', selectedStudentName);
    };

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const response: SemesterData = await AuthServiceInstance.getSemesters();
                if (response.status === 'success') {
                    setSemester(response.data);
                } else {
                    console.error('Failed to fetch semesters.');
                }
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        };

        fetchSemesters();
    }, []);

    return (

        <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formSemester">
            <Form.Label>Semester</Form.Label>
            <Form.Select
    name="semester"
    aria-label="Select Semester"
    defaultValue=""
    onChange={handleSemesterChange}
    >
    <option value="" disabled>
    Select Semester
    </option>
    {semester.map((sem, index) => (
        <option key={index} value={sem.semester_id}>
        {sem.semester_id}
        </option>
    ))}
    </Form.Select>
    </Form.Group>

    <Form.Group controlId="formStudent" className="mt-3">
        <Form.Label>Student</Form.Label>
        <Form.Select
    name="student"
    aria-label="Select Student"
    defaultValue=""
    onChange={handleStudentChange}
    disabled={isStudentDisabled} // Disable the dropdown if no semester is selected
    >
    <option value="" disabled>
    Select Student
    </option>
    {students.map((student, index) => (
        <option key={index} value={student.id}>
        {student.name}
        </option>
    ))}
    </Form.Select>
    </Form.Group>

    <Button variant="primary" type="submit" className="mt-3">
        Add Student
    </Button>
    </Form>

    )
}

export default AddStudentToSemesterForm;