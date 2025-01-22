import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";

import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import AuthServiceInstance from "../GeneralComponents/AuthService.tsx";

const EditSemestersPage = () => {
    const [formData, setFormData] = useState({
        semester_start_date: '',
        semester_end_date: '',
        semester_id: '',
        semester_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        AuthServiceInstance.addSemester(formData)
        // Add your form submission logic here
    };

    return (
        <SkeletonForAllPages>
        <Container className="mt-5">
            <h2>Semester Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="semester_start_date">
                    <Form.Label>Semester Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="semester_start_date"
                        value={formData.semester_start_date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="semester_end_date">
                    <Form.Label>Semester End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="semester_end_date"
                        value={formData.semester_end_date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="semester_id">
                    <Form.Label>Semester ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="semester_id"
                        value={formData.semester_id}
                        onChange={handleChange}
                        placeholder="Enter Semester ID"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="semester_name">
                    <Form.Label>Semester Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="semester_name"
                        value={formData.semester_name}
                        onChange={handleChange}
                        placeholder="Enter Semester Name"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </SkeletonForAllPages>
    );
};
export default EditSemestersPage;