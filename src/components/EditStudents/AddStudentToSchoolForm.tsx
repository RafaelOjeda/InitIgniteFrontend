import React, { useState, useEffect } from "react";
import AuthServiceInstance from "../GeneralComponents/AuthService.tsx";
import {Form} from "react-bootstrap";

const SchoolList = () => {
    const [schoolNames, setSchoolNames] = useState<string[]>([]);

    useEffect(() => {
        // Fetch data using AuthService
        const fetchSchoolNames = async () => {
            try {
                const response = await AuthServiceInstance.getTeachers();

                setSchoolNames(response.teacher_list);
            } catch (error) {
                console.error("Error fetching school names:", error);
            }

        };

        fetchSchoolNames();
    }, []);

    return (
        <Form>
            <Form.Select aria-label="Select a school">
                {schoolNames.map((school) => (
                    <option key={school.SchoolName} value={school.SchoolName}>
                        {school.SchoolName}
                    </option>
                ))}
            </Form.Select>



        </Form>
    );
};

export default SchoolList;
