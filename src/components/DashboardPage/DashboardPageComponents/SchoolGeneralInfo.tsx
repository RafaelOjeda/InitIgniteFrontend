import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
// @ts-ignore
import AuthServiceInstance from '../../GeneralComponents/AuthService.tsx';

interface Teacher {
    fields: {
        Name: string;
        "School Name": string;
        "School Address": string;
    };
}

interface SchoolGeneralInfoProps {}

const SchoolGeneralInfo: React.FC<SchoolGeneralInfoProps> = () => {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const renderStatus = (message: string, isError = false) => (
        <Row className="m-0 p-0 flex-grow-1">
            <Col xs={12} className="min-vh-25 d-flex justify-content-center align-items-center">
                <h1 className={`text-center m-0 ${isError ? 'text-danger' : ''}`} style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
                    {message}
                </h1>
            </Col>
        </Row>
    );

    useEffect(() => {
        const fetchTeacherInfo = async () => {
            try {
                // Step 1: Get the current user's UID
                const currentUser = await AuthServiceInstance.currentUser();
                const userUID = currentUser.currentUser.uid;

                // Step 2: Fetch the user's information to get teacher_ids
                const userInfo = await AuthServiceInstance.getUser({ user_id: userUID });
                if (userInfo.status !== "success" || !userInfo.data.teacher_ids?.length) {
                    throw new Error("No teacher IDs found for the current user.");
                }

                // Step 3: Fetch the teacher's details using the first teacher_id
                const teacherId = userInfo.data.teacher_ids[0];
                const teacherResponse = await AuthServiceInstance.getTeacher(teacherId);

                // Step 4: Set the teacher's information
                setTeacher(teacherResponse);
            } catch (err: any) {
                setError(err.message || 'Failed to load teacher information');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherInfo();
    }, []);

    if (loading) return renderStatus("Loading...");
    if (error) return renderStatus(`Error: ${error}`, true);
    if (!teacher) return renderStatus("Teacher not found");

    return (
        <Row className="m-0 pt-5 px-md-5 px-3 flex-grow-1">
            <Col xs={12}>
                <h1 className="display-1 mb-2">{teacher.fields.Name}</h1>
                <h4 className="display-4 opacity-75">{teacher.fields["School Name"]}</h4>
                <h6 className="display-6 opacity-50">{teacher.fields["School Address"]}</h6>
            </Col>
        </Row>
    );
};

export default SchoolGeneralInfo;