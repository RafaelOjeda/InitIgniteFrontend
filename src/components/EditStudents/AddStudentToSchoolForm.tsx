import React, { useState, useEffect } from "react";
import AuthServiceInstance from "../GeneralComponents/AuthService.tsx";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";

interface Semester {
    semester_id: string;
    semester_start_date: string;
    semester_end_date: string;
    teachers: string[];
    teacher_students: string[];
}

interface Teacher {
    id: string;
    name: string;
}

interface Student {
    id: string;
    name: string;
}

const SchoolList: React.FC = () => {
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [selectedTeacher, setSelectedTeacher] = useState<string>('');
    const [selectedStudent, setSelectedStudent] = useState<string>('');
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    const fetchSemesters = async () => {
        try {
            const response = await AuthServiceInstance.getSemesters();
            if (response.status === "success" && Array.isArray(response.data)) {
                setSemesters(response.data.map((item: any) => ({
                    semester_id: item.semester_id,
                    semester_start_date: item.semester_start_date,
                    semester_end_date: item.semester_end_date,
                    teachers: item.teachers,
                    teacher_students: item.teacher_students,
                })));
            } else {
                console.error("Error fetching semesters:", response?.message || "Invalid data format");
            }
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchSemesters();
        })();
    }, []);

    const fetchTeacherAndStudentData = async () => {
        if (selectedSemester) {
            const selectedSemesterData = semesters.find(sem => sem.semester_id === selectedSemester);
            if (selectedSemesterData) {

                // Directly use the IDs from selectedSemesterData.teachers
                const teachers = selectedSemesterData.teachers.map(teacherId => ({
                    id: teacherId,
                    name: teacherId // Use ID as name (or fetch name if possible later)
                }));
                setTeachers(teachers as Teacher[]);

                // Directly use the IDs from selectedSemesterData.teacher_students
                const students = selectedSemesterData.teacher_students.map(studentId => ({
                    id: studentId,
                    name: studentId // Use ID as name (or fetch name if possible later)
                }));
                setStudents(students as Student[]);
            }
        } else {
            setTeachers([]);
            setStudents([]);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchTeacherAndStudentData();
        })();
    }, [selectedSemester, semesters]);

    const handleSemesterSelect = (eventKey: string) => {
        setSelectedSemester(eventKey);
        setSelectedTeacher('');
        setSelectedStudent('');

        // Log to console immediately
        console.log({
            timestamp: new Date(),
            type: "semester",
            value: eventKey,
        });
    };

    const handleTeacherSelect = (eventKey: string) => {
        setSelectedTeacher(eventKey);

        // Log to console immediately
        console.log({
            timestamp: new Date(),
            type: "teacher",
            value: eventKey,
        });
    };

    const handleStudentSelect = (eventKey: string) => {
        setSelectedStudent(eventKey);

        // Log to console immediately
        console.log({
            timestamp: new Date(),
            type: "student",
            value: eventKey,
        });
    };

    const handleAddMatch = async () => {

        try {
            const requestBody = {
                teacher_id: selectedTeacher,
                semester_id: selectedSemester,
                teacher_student_id: selectedStudent,
            };

            const response = await AuthServiceInstance.addTeacherStudentToClassroom(requestBody);

            console.log("Response from API:", response);

            if (response.status === "success") {
                console.log("Student added to classroom: Success", response.message);
                setSelectedTeacher('');
                setSelectedStudent('');
                alert("Student added to classroom successfully!");
            } else {
                console.error("Error adding student to classroom:", response.message);
                const errorMessage = response?.data?.message || response?.message || "An error occurred.";
                alert(`Error adding student: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error adding student to classroom (network/other):", error);
            const errorMessage = error?.response?.data?.message || error?.message || "A network or other error occurred.";
            alert(`A network or other error occurred: ${errorMessage}`);
        }
    };
    return (
        <Form>
            <h2>Match to Classroom</h2>
            <Row className="mb-3">
                <Form.Group as={Col} xs={12} controlId="formGridSemester">
                    <Form.Label>Semester</Form.Label>
                    <DropdownButton
                        id="semester-dropdown"
                        title={selectedSemester || "Select Semester"}
                        onSelect={handleSemesterSelect}
                        className="w-100"
                    >
                        {semesters.map((sem) => (
                            <Dropdown.Item key={sem.semester_id} eventKey={sem.semester_id}>
                                {sem.semester_id}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} xs={12} controlId="formGridTeacher">
                    <Form.Label>Teacher</Form.Label>
                    <DropdownButton
                        variant="outline-secondary"
                        title={selectedTeacher ? teachers.find(t => t.id === selectedTeacher)?.name : "Teacher"}
                        id="teacher-dropdown"
                        onSelect={handleTeacherSelect}
                        className="w-100"
                    >
                        {teachers.map((t) => (
                            <Dropdown.Item key={t.id} eventKey={t.id}>
                                {t.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} xs={12} controlId="formGridStudent">
                    <Form.Label>Student</Form.Label>
                    <DropdownButton
                        variant="outline-secondary"
                        title={selectedStudent ? students.find(s => s.id === selectedStudent)?.name : "Student"}
                        id="student-dropdown"
                        onSelect={handleStudentSelect}
                        className="w-100"
                    >
                        {students.map((s) => (
                            <Dropdown.Item key={s.id} eventKey={s.id}>
                                {s.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} xs={12}>
                    <Button variant="primary" onClick={handleAddMatch} className="w-100">
                        Add
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );
};

export default SchoolList;