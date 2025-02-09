import './Test.css';
import {Carousel, Col, Row} from 'react-bootstrap';

import { useState, useEffect } from 'react';

const FullScreenCarousel = () => {
    const [isCarouselVisible, setIsCarouselVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsCarouselVisible(window.innerWidth <= 992); // Adjust breakpoint as needed
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check on load

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        isCarouselVisible && (
            <Carousel interval={3000} variant="dark">
                <Carousel.Item style={{ width: '100vw' }}>
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div className="text-center">
                            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: ".5rem" }}>Learn to Teach</h1>
                            <p>Empower yourself to educate future generations.</p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item style={{ width: '100vw' }}>
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#7ed957"
                        }}
                    >
                        <div className="text-center text-dark">
                            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: ".5rem" }}>Master Public Speaking</h1>
                            <p>Gain confidence and become an effective communicator.</p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item style={{ width: '100vw' }}>
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div className="text-center">
                            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: ".5rem" }}>Explore Computational Thinking</h1>
                            <p>Develop essential 21st-century skills.</p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        )
    );
};



const Jumbotron = () => {
    return (
        <div style={{height: "100vh", overflow: "hidden"}}>
            <Row style={{height: "100%"}}>
                <Col
                    md={4}
                    style={{
                        backgroundColor: "#1a1a1a",
                        textAlign: "center",
                        color: "#FFF",
                        height: "100vh",
                        padding: "20rem 3rem",
                        position: "relative", // Added to make the column a positioning context
                    }}>
                    <h1 style={{fontSize: "3rem", fontWeight: "bold", marginBottom: ".5rem"}}>LEARN...</h1>
                    <ul style={{
                        listStyleType: "none",
                        textAlign: "left"
                    }}>
                        <li style={{fontSize: "2rem"}}>• to teach students K-12</li>
                        <li style={{fontSize: "2rem"}}>• to strengthen public speaking skills</li>
                    </ul>

                </Col>

                <Col md={4}
                     style={{
                         backgroundColor: "#7ed957",
                         textAlign: "center",
                         color: "#1a1a1a",
                         padding: "20rem 3rem",
                         position: "relative",
                     }}
                >
                    <h1 style={{fontSize: "3rem", fontWeight: "bold", marginBottom: ".5rem"}}>TEACH...</h1>
                    <ul style={{
                        listStyleType: "none",
                        textAlign: "left"
                    }}>
                        <li style={{fontSize: "2rem"}}>• foundational topics on computational thinking</li>
                        <li style={{fontSize: "2rem"}}>• semester long course currated by you</li>
                    </ul>

                </Col>

                <Col
                    md={4}
                    style={{
                        backgroundColor: "#1a1a1a",
                        textAlign: "center",
                        color: "#FFF",
                        padding: "20rem 3rem",
                        position: "relative",
                    }}>
                    <h1 style={{fontSize: "3rem", fontWeight: "bold", marginBottom: ".5rem"}}>GROW...</h1>
                    <ul style={{
                        listStyleType: "none",
                        textAlign: "left"
                    }}>
                        <li style={{fontSize: "2rem"}}>• counts as an internship on your transcript</li>
                        <li style={{fontSize: "2rem"}}>• young minds with their passion for tech</li>
                    </ul>


                </Col>
            </Row>
        </div>
    )
}

export default function Test() {
    const [isCarouselVisible, setIsCarouselVisible] = useState(window.innerWidth <= 992);

    useEffect(() => {
        const handleResize = () => {
            setIsCarouselVisible(window.innerWidth <= 992); // Adjust breakpoint as needed
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {isCarouselVisible ? <FullScreenCarousel /> : <Jumbotron />}
        </>
    );
}


