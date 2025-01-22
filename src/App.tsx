import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage.js';
import SplashPage from './Components/SplashPage/SplashPage.tsx'
import RegisterPage from './Components/RegisterPage/RegisterPage.js';
import ResetPasswordPage from './Components/ResetPassword/ResetPassword.js';
// import ProtectedRoute from './Components/GeneralComponents/ProtectedRoute.js';
import DashboardPage from './Components/DashboardPage/DashboardPage.tsx';
// import ProfilePage from './Components/ProfilePage/ProfilePage.js';
// import RestYourMindPage from './Components/RestYourMindPage/RestYourMindPage.js'
// import FeelingsCheckInPage from "./Components/FeelingsCheckIn/FeelingsCheckIn.js";
// import AmbientMusicPlayerPage from "./Components/AmbientPlayerPage/AmbientPlayerPage.js";
import ErrorPage from "./Components/ErrorPage/ErrorPage.js"
import ProtectedRoute from "./Components/GeneralComponents/ProtectedRoute.tsx";
import TaskPage from "./Components/TaskPage/TaskPage.tsx";
import EditStudentsPage from "./Components/EditStudents/EditStudentsPage.tsx";
import EditSemestersPage from "./Components/EditSemesters/EditSemestersPage.tsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ResetPasswordPage />} />
                <Route element={<ProtectedRoute />} >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/dashboard/add/task" element={<TaskPage />} />
                    <Route path="/dashboard/admin/edit/students" element={<EditStudentsPage />} />
                    <Route path="/dashboard/admin/edit/semesters" element={<EditSemestersPage />} />
                </Route>
                <Route path="/*" element={<ErrorPage />} />

            </Routes>
        </Router>

    );
};

export default App;