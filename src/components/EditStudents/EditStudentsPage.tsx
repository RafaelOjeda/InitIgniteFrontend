import StudentList from "./StudentList.tsx";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";
import AddStudentForm from "./AddStudentForm.tsx";

// edit students by semester
// view students of past semesters
// add and remove them
const EditStudentsPage = () => {
    return (
        <SkeletonForAllPages>

            <h1>Edit Students</h1>
            <AddStudentForm />
        </SkeletonForAllPages>
    )
}
export default EditStudentsPage;