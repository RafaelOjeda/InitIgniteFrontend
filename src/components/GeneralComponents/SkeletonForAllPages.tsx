import React, { ReactNode } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Footer from "./Footer";
import AccountNavbar from "./AccountNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';

interface SkeletonForAllPagesProps {
    children: ReactNode;
}

const SkeletonForAllPages: React.FC<SkeletonForAllPagesProps> = ({ children }) => {
    return (
        <Container fluid style={{
            padding: "0",
        }}>
            {/*<Row>*/}
            {/*    <Col xs={12}>*/}
            {/*        <AccountNavbar />*/}
            {/*    </Col>*/}
            {/*</Row>*/}
                {children}
            <Row>
                <Col xs={12}>
                    {/*<Footer />*/}
                </Col>
            </Row>
        </Container>
    );
}

export default SkeletonForAllPages;
