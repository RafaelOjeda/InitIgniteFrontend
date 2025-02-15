import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SchoolGeneralInfo from './SchoolGeneralInfo';
import TeacherStudentSchedule from './TeacherStudentSchedule';

const Test: React.FC = () => {
    // Frosted glass style for the boxes
    const frostedBoxStyle: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minHeight: '200px',
        minWidth: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
        padding: '20px',
        margin: '15px'
    };

    return (
        <Container fluid className="m-0 p-0" style={{
            minHeight: "100vh",
            backgroundImage: "url(background.jpg)",
            backgroundSize: "cover",
            position: 'relative'
        }}>
            {/* Original Content Section */}
            <div className="d-flex flex-column d-md-block" style={{ minHeight: "100vh" }}>
                <SchoolGeneralInfo />
                <TeacherStudentSchedule />
            </div>

            {/* Custom Columns with Frosted Effect */}
            <Row className="gx-5 m-0 p-0 justify-content-center">
                <Col xs={12} md={6} className="m-0 p-0 d-flex justify-content-center">
                    <div style={frostedBoxStyle}>
                        Custom Column Content 1
                    </div>
                </Col>
                <Col xs={12} md={6} className="m-0 p-0 d-flex justify-content-center">
                    <div style={frostedBoxStyle}>
                        Custom Column Content 2
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Test;