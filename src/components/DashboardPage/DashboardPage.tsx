import "./DashboardPageStyling/DashboardPageStyling.scss";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";
import { Row, Col, Container } from 'react-bootstrap'; // Import Container
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardPage = () => {
	return (
		<SkeletonForAllPages>
			{/* Wrap the content in a Container with min-vh-100 */}
			<Container style={{ minHeight: '90vh' }} className="d-flex flex-column justify-content-center">
				{/* Start Semester and Manage Students in the same row */}
				<Row className="mb-3">
					<Col xs={6}>
						<div className="bg-warning p-5 text-center rounded-3 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
							<a href={"/dashboard/admin/edit/semesters"} className="text-decoration-none text-dark">Start Semester</a>
						</div>
					</Col>
					<Col xs={6}>
						<div className="bg-warning p-5 text-center rounded-3 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
							<a href={"/dashboard/admin/edit/students"} className="text-decoration-none text-dark">Manage Students</a>
						</div>
					</Col>
				</Row>

				{/* Manage Task */}
				<Row className="mb-3">
					<Col xs={12}>
						<div className="bg-warning p-5 text-center rounded-3">
							<a href={"/dashboard/add/task"} className="text-decoration-none text-dark">Manage Task</a>
						</div>
					</Col>
				</Row>

				{/* Announcements */}
				<Row className="mb-3">
					<Col xs={12}>
						<div className="bg-warning p-5 text-center rounded-3">
							Add Announcement
						</div>
					</Col>
				</Row>
			</Container>
		</SkeletonForAllPages>
	);
}

export default DashboardPage;