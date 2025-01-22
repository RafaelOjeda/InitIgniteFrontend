import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import AuthServiceInstance from "../GeneralComponents/AuthService.tsx";
import {Button} from "react-bootstrap"

export interface Student {
    email: string;
}

export interface StudentData {
    status: string;
    data: Student[];
}

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]); // State to store the student data

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response: StudentData = await AuthServiceInstance.getUsers();
                if (response.status === 'success') {
                    setStudents(response.data); // Update state with student data
                } else {
                    console.error('Failed to fetch students.');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents(); // Call the function to fetch data
    }, []); // Dependency array ensures this runs once when the component mounts

    return (
        <>
            <Table striped bordered hover>
                <thead>
                {/*<tr>*/}
                {/*    <th>#</th>*/}
                {/*    <th>Email</th>*/}
                {/*</tr>*/}
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <h1>{student.email}</h1>
                        </td>

                        <td>
                            <Button variant="danger">
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default StudentList;
