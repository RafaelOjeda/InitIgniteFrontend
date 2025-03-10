import { Container } from 'react-bootstrap';
import AddStudentToSemesterForm from "./AddStudentToSemesterForm.tsx";
import StudentListBySemester from "./StudentListBySemester.tsx";
import AddStudentToSchoolForm from "./AddStudentToSchoolForm.tsx";

const AddStudentForm = () => {

    return (
        <Container className="mt-5">
            <AddStudentToSchoolForm />

            <h2>Student List by Semester</h2>
            <StudentListBySemester />
        </Container>
    );
};

export default AddStudentForm;

