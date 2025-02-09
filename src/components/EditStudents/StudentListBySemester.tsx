import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import AuthServiceInstance from "../GeneralComponents/AuthService.tsx";

export interface Semester {
    semester_id: string;
    semester_start_date?: string;
    semester_end_date?: string;
    teachers?: string[];
    teacher_students?: string[];  // Array of student UIDs
}

export interface Student {
    id: string;
    name: string;
    email: string;
}

interface SemesterData {
    status: string;
    data: Semester[];
}

const StudentListBySemester = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [teacherStudents, setTeacherStudents] = useState<string[]>([]); // Store the teacher_students list
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

    // Fetch semesters on component mount
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const response: SemesterData = await AuthServiceInstance.getSemesters();
                if (response.status === "success" && response.data) {
                    setSemesters(response.data);
                } else {
                    console.error("Failed to fetch semesters.");
                }
            } catch (error) {
                console.error("Error fetching semesters:", error);
            }
        };

        fetchSemesters();
    }, []);

    // Fetch teacher students when a semester is selected
    const handleSemesterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const semesterId = e.target.value;
        setSelectedSemester(semesterId);

        if (semesterId) {
            const selectedSemesterData = semesters.find((sem) => sem.semester_id === semesterId);

            if (selectedSemesterData && selectedSemesterData.teacher_students) {
                setTeacherStudents(selectedSemesterData.teacher_students);
            } else {
                console.error("No teacher students found for this semester.");
                setTeacherStudents([]);
            }
        } else {
            setTeacherStudents([]); // Clear teacher students if no semester is selected
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
                        {semesters.map((sem, index) => (
                            <option key={index} value={sem.semester_id}>
                                {sem.semester_id}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>

            <Container className="mt-4">
                <Row className="bg-light p-2 border-bottom">
                    <Col><strong>Student UID</strong></Col>
                    <Col className="text-end"><strong>Action</strong></Col>
                </Row>
                {teacherStudents.map((uid) => (
                    <Row key={uid} className="p-2 border-bottom">
                        <Col>{uid}</Col>
                        <Col className="text-end">
                            <Button
                                variant="danger"
                                onClick={() => console.log(`Delete student with UID: ${uid}`)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                ))}
                {teacherStudents.length === 0 && selectedSemester && (
                    <Row className="p-2">
                        <Col>No teacher students found for this semester.</Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default StudentListBySemester;
