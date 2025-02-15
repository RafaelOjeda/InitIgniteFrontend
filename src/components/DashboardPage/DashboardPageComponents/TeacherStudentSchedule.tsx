// TeacherStudentSchedule.tsx
import React from 'react';
import { Row, Col } from "react-bootstrap";

// Glassmorphism style object
const glassmorphismStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 -20px 40px rgba(255, 255, 255, 0.2)',
    padding: '20px',
};

// Schedule item text styles
const scheduleLabelStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    opacity: 0.75
};

const scheduleValueStyle: React.CSSProperties = {
    fontSize: "1.5rem"
};

const TeacherStudentSchedule: React.FC = () => {
    return (
        <Row className="m-0 p-4" style={glassmorphismStyle}>
            <Col xs={12} md={{ span: 8, offset: 4 }} lg={{ span: 6, offset: 6 }}>
                <div className="d-flex flex-column gap-2">
                    <ScheduleItem label="Start Date" value="February 2, 2025" />
                    <ScheduleItem label="Time" value="2-3pm" />
                    <ScheduleItem label="End Date" value="To be determined" />
                </div>
            </Col>
        </Row>
    );
};

const ScheduleItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="d-flex justify-content-between align-items-baseline">
        <span style={scheduleLabelStyle}>{label}:</span>
        <span style={scheduleValueStyle}>{value}</span>
    </div>
);

export default TeacherStudentSchedule;