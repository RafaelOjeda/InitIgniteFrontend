import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import AuthServiceInstance from "../GeneralComponents/AuthService.tsx";
import {Semester, SemesterData} from "./AddStudentToSemesterForm.tsx";

export interface Student {
    id: string;
    name: string;
    email: string;
}

const StudentListBySemester = () => {
    const [semester, setSemester] = useState<Semester[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

    // Fetch semesters on component load
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

    // Fetch students when a semester is selected
    const handleSemesterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const semesterId = e.target.value;
        setSelectedSemester(semesterId);

        if (semesterId) {
            try {
                const response = await AuthServiceInstance.getUsers({
                    semester_id: semesterId,
                });

                if (response.status === 'success') {
                    console.log(response.data);
                    setStudents(response.data.students); // Assuming API returns { students: [] }
                } else {
                    console.error('Failed to fetch students.');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        } else {
            setStudents([]); // Clear students if no semester is selected
        }
    };

    // Delete student from the list (optional)
    const handleDeleteStudent = async (studentId: string) => {
        if (!selectedSemester) {
            console.error("No semester selected.");
            return;
        }
        try {
            // await deleteDoc(doc(db, "Semester", selectedSemester, "students", studentId));
            console.log("Student deleted successfully.");
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student.id !== studentId)
            );
        } catch (error) {
            console.error("Could not delete student with ID:", studentId, error);
        }
    };


    return (
        <>
            <Form>
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
                                {sem.semester_name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>

            <Container className="mt-4">
                <Row className="bg-light p-2 border-bottom">
                    <Col><strong>Username</strong></Col>
                    <Col><strong>Email</strong></Col>
                    <Col className="text-end"><strong>Action</strong></Col>
                </Row>
                {students.map((student) => (
                    <Row key={student.id} className="p-2 border-bottom">
                        <Col>{student.name}</Col>
                        <Col>{student.email}</Col>
                        <Col className="text-end">
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteStudent(student.id)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                ))}
                {students.length === 0 && selectedSemester && (
                    <Row className="p-2">
                        <Col>No students found for this semester.</Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default StudentListBySemester;
