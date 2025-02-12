import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage.js';
import SplashPage from './Components/SplashPage/SplashPage.tsx'
import RegisterPage from './Components/RegisterPage/RegisterPage.js';
import ResetPasswordPage from './Components/ResetPassword/ResetPassword.js';
import DashboardPage from './Components/DashboardPage/DashboardPage.tsx';
import ErrorPage from "./Components/ErrorPage/ErrorPage.js"
import AdminRoute from "./components/GeneralComponents/AdminRoute.tsx";
import TaskPage from "./Components/TaskPage/TaskPage.tsx";
import EditStudentsPage from "./Components/EditStudents/EditStudentsPage.tsx";
import EditSemestersPage from "./Components/EditSemesters/EditSemestersPage.tsx";
import Test from "./components/Test/Test.tsx";
import UserRoute from "./components/GeneralComponents/UserRoute.tsx";
import UserDashboardPage from "./components/DashboardPage/UserDashboardPage.tsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ResetPasswordPage />} />

                <Route element={<UserRoute />}>
                    <Route path="/dashboard/user" element={<UserDashboardPage />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path="/dashboard/admin" element={<DashboardPage />} />
                    <Route path="/dashboard/add/task" element={<TaskPage />} />
                    <Route path="/dashboard/admin/edit/students" element={<EditStudentsPage />} />
                    <Route path="/dashboard/admin/edit/semesters" element={<EditSemestersPage />} />
                </Route>

                <Route path="/*" element={<ErrorPage />} /> {/* Only ONE catch-all route */}

            </Routes>
        </Router>
    );
};

export default App;