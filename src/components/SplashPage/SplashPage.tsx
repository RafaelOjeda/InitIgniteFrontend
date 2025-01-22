
import "./SplashPageStyling/SplashPageStyling.scss";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";
import {Row, Col, Card} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {useEffect, useState} from "react";

const SplashPage = () => {

	const [isSwiperVisible, setIsSwiperVisible] = useState(window.innerWidth <= 450);

	useEffect(() => {
		const handleResize = () => {
			setIsSwiperVisible(window.innerWidth <= 450);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const FullScreenSwiper = () => {
		return (
			<div style={{ height: "100vh", overflow: "hidden" }}>
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					loop={true}
					autoplay={{ delay: 3000 }}
					style={{ height: "100%" }}
				>
					{/* First Slide */}
					<SwiperSlide style={{ backgroundColor: "#1A1A1A", color: "#FFFFFF", position: "relative" }}>
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center",
								paddingTop: "19rem", // Adjusts the top margin for the text
							}}
						>
							<div
								style={{
									zIndex: 1, // Ensures the text stays above the image
								}}
							>
								<h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom:".5rem" }}>LEARN...</h1>
								<ul style={{ listStyleType: "none",
									textAlign: "left"}}>
									<li style={{ fontSize: "2rem"}}>• to teach students K-12</li>
									<li style={{ fontSize: "2rem" }}>• to strengthen public speaking skills</li>
								</ul>
							</div>
						</div>

						<img
							src="kidwithrobot.png"
							alt="Kid with robot"
							style={{
								position: "absolute", // Anchors the image
								bottom: 0, // Sticks the image to the bottom
								left: 0,
								height: "410px",
								width: "100%", // Ensures the image takes the full width
								objectFit: "cover", // Ensures proper scaling
								zIndex: 0, // Places the image behind the text
							}}
						/>
					</SwiperSlide>


					{/* Second Slide */}
					<SwiperSlide style={{ backgroundColor: "#7ed957", color: "#FFFFFF", position: "relative" }}>
						<div
							style={{
								color: "#1A1A1A",
								height: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center",
								paddingTop: "19rem", // Adjusts the top margin for the text
							}}
						>
							<div
								style={{
									zIndex: 1, // Ensures the text stays above the image
								}}
							>
								<h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: ".5rem" }}>LEARN...</h1>
								<ul style={{ listStyleType: "none",
									textAlign: "left"}}>
									<li style={{ fontSize: "2rem"}}>• foundational topics on computational thinking</li>
									<li style={{ fontSize: "2rem" }}>• semester long course currated by you</li>
								</ul>
							</div>
						</div>

						<img
							src="initLogo.png"
							alt="Kid with robot"
							style={{
								position: "absolute", // Anchors the image
								bottom: 0, // Sticks the image to the bottom
								left: 0,
								height: "200px",
								width: "100vw", // Ensures the image takes the full width
								zIndex: 0, // Places the image behind the text
							}}
						/>
					</SwiperSlide>

					{/* Third Slide */}
					<SwiperSlide style={{ backgroundColor: "#1A1A1A", color: "#FFFFFF", position: "relative" }}>
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center",
								paddingTop: "19rem", // Adjusts the top margin for the text
							}}
						>
							<div
								style={{
									zIndex: 1, // Ensures the text stays above the image
								}}
							>
								<h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: ".5rem" }}>GROW...</h1>
								<ul style={{ listStyleType: "none",
									textAlign: "left"}}>
									<li style={{ fontSize: "2rem"}}>• counts as an internship on your transcript</li>
									<li style={{ fontSize: "2rem" }}>• young minds with their passion for tech</li>
								</ul>
							</div>
						</div>

						<img
							src="brain.png"
							style={{
								position: "absolute", // Anchors the image
								top: "15px", // Sticks the image to the bottom
								left: 0,
								height: "340px",
								width: "100vw", // Ensures the image takes the full width
								zIndex: 0, // Places the image behind the text
							}}
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		);
	};

	const Test = () => {
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

						<img
							src="kidwithrobot.png"
							alt="Kid with robot"
							style={{
								position: "absolute", // Anchors the image
								bottom: 0, // Sticks the image to the bottom
								left: 0,
								height: "410px",
								width: "100%", // Ensures the image takes the full width
								objectFit: "cover", // Ensures proper scaling
								zIndex: 0, // Places the image behind the text
							}}
						/>
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

						<img
							src="initLogo.png"
							alt="Kid with robot"
							style={{
								position: "absolute", // Anchors the image
								bottom: "-1rem", // Sticks the image to the bottom
								left: 0,
								height: "220px",
								width: "100%", // Ensures the image takes the full width
								objectFit: "cover", // Ensures proper scaling
								zIndex: 0, // Places the image behind the text
							}}
						/>
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

						<img
							src="brain.png"
							alt="Kid with robot"
							style={{
								position: "absolute", // Anchors the image
								top: "1rem", // Sticks the image to the bottom
								left: "50%", // Move the image's left edge to the horizontal center
								transform: "translateX(-50%)", // Adjusts the image's position to center it
								height: "340px",
								width: "auto", // Maintain aspect ratio
								objectFit: "cover", // Ensures proper scaling
								zIndex: 0, // Places the image behind the text
								overflow: "hidden"
							}}
						/>
					</Col>
				</Row>
			</div>
		)
	}

	return (
		<SkeletonForAllPages>
			<Test/>
			{isSwiperVisible && <FullScreenSwiper/>}
			<Row
				xs={12}
				style={{
					backgroundColor: "#7ed957",
					textAlign: "center",
					color: "black",
					padding: "5rem 3rem",
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
					padding: "4rem 3rem",
				}}
			>
				<Col>
					<h2>
						<b>OUR MISSION</b>
					</h2>
					<p>Ignite the passion for technology by teaching and inspiring the youth️</p>
				</Col>
			</Row>

			<div>
				<h3>Since 2024 100+ FIU Students have impacted</h3>
				<Row
					className="mt-5"
					style={{
						backgroundColor: "#7ed957"
					}}
				>
					<Col md={6} className="d-flex flex-column align-items-center">
						<Card style={{width: '15rem', borderRadius: '50%', padding: '2rem', textAlign: 'center'}}>
							<Card.Body>
								<Card.Title style={{fontSize: '2rem', fontWeight: 'bold'}}>500</Card.Title>
								<Card.Text>STUDENTS</Card.Text>
							</Card.Body>
						</Card>
						<p className="mt-3">From all over the Miami-Dade County</p>
					</Col>
					<Col md={6} className="d-flex flex-column align-items-center">
						<Card style={{width: '15rem', borderRadius: '50%', padding: '2rem', textAlign: 'center'}}>
							<Card.Body>
								<Card.Title style={{fontSize: '2rem', fontWeight: 'bold'}}>20</Card.Title>
								<Card.Text>SCHOOLS</Card.Text>
							</Card.Body>
						</Card>
						<p className="mt-3">From in-class to after-school K-12 programs</p>
					</Col>
				</Row>
			</div>

			<div>
				<h3>Thank you to our partners</h3>
				<img src={"initLogo.png"}/>

			</div>
		</SkeletonForAllPages>
	);
};

export default SplashPage;
