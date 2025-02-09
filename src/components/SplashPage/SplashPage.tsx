
import "./SplashPageStyling/SplashPageStyling.scss";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";
import {Row, Col, Card, Carousel} from "react-bootstrap";
import {useEffect, useState} from "react";

function Logo({imgSource, imgHeight, imgWidth, imgColor}:
			  {imgSource: string, imgHeight: string, imgWidth: string, imgColor: string}) {
	return (
		<img src={imgSource}
			 style={{
				 width:imgWidth,
				 height:imgHeight,
				 color: imgColor,
				 paddingTop: "1rem",
				 paddingBottom: "1rem",
				 paddingLeft: "0",
				 paddingRight: "0",
				 margin: "2.5rem 0",
				 padding: "0"
		}}/>
	);
};

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

const SplashPage = () => {
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
		<SkeletonForAllPages>
			{isCarouselVisible ? <FullScreenCarousel /> : <Jumbotron />}

			<Row
				xs={12}
				style={{
					backgroundColor: "#7ed957",
					textAlign: "center",
					color: "black",
					padding: "8rem 3rem",
					margin: "0"
				}}
			>
				<Col>
					<h2>
						<b>WHAT IS INIT IGNITE?</b>
					</h2>
					<p>
						Init Ignite is a 0 credit course taught by FIU in partnership with Init. The goal is to
						aid FIU
						students of any major teach K-12 students Computational Thinking skills using unplugged
						activities, group projects, and hands-on experiences through a 3 month program.
					</p>
				</Col>
			</Row>
			<Row
				xs={12}
				style={{
					backgroundColor: "#1A1A1A",
					textAlign: "center",
					color: "white",
					padding: "8rem 3rem",
					margin: "0"
				}}
			>
				<Col>
					<h2>
						<b>OUR MISSION</b>
					</h2>
					<p>Ignite the passion for technology by teaching and inspiring the youth️</p>
				</Col>
			</Row>

			<div style={{
				backgroundColor: "#71cc27",
				margin: "0"
			}}>
				<h3 className="md-0" style={{
					paddingTop: "2rem",
					marginTop: "0"
				}}>Since 2024 100+ FIU Students have impacted</h3>
				<Row
					className="mt-5"
					style={{
						backgroundColor: "#7ed957",
						padding: '5rem 0rem',
						margin: '0'
					}}
				>
					<Col md={6}
						 className="d-flex
						 			flex-column
						 			align-items-center"
						 style={{
							 paddingBottom: '2rem',
					}}>
						<Card style={{
							width: '15rem',
							borderRadius: '50%',
							padding: '2rem',
							textAlign: 'center'}}>
							<Card.Body>
								<Card.Title style={{fontSize: '2rem', fontWeight: 'bold'}}>500</Card.Title>
								<Card.Text>STUDENTS</Card.Text>
							</Card.Body>
						</Card>
						<p className="mt-3">From all over the Miami-Dade County</p>
					</Col>
					<Col md={6} className="d-flex flex-column align-items-center">
						<Card style={{
							width: '15rem',
							borderRadius: '50%',
							padding: '2rem',
							textAlign: 'center'}}>
							<Card.Body>
								<Card.Title style={{fontSize: '2rem', fontWeight: 'bold'}}>20</Card.Title>
								<Card.Text>SCHOOLS</Card.Text>
							</Card.Body>
						</Card>
						<p className="mt-3">From in-class to after-school K-12 programs</p>
					</Col>
				</Row>
			</div>

			<div style={{
				backgroundColor: "#1A1A1A",
			}}>
				<h3 className="md-0" style={{
					backgroundColor: "#121212",
					color: "#FFF",
					padding: "2rem 0rem",
					margin: "0",
				}}>
					Thank you to our partners</h3>
				<Row
					style={{
						padding: "0",
						margin: "0"
					}}
				>
					<Col xs={12} md={4}
						 className="d-flex justify-content-center"
					>
						<Logo imgSource={"initLogo.svg"} imgHeight={"119px"} imgWidth={"287px"} imgColor={"White"} />
					</Col>
					<Col xs={12} md={4}
						 className="d-flex justify-content-center"
					>
						<Logo imgSource={"fiulogo.svg"} imgHeight={"119px"} imgWidth={"287px"} imgColor={""} />
					</Col>
					<Col xs={12} md={4}
						 className="d-flex justify-content-center"
					>
						<Logo imgSource={"statefarmlogo.svg"} imgHeight={"119px"} imgWidth={"287px"} imgColor={""} />
					</Col>
				</Row>
			</div>
		</SkeletonForAllPages>
	);
};

export default SplashPage;
