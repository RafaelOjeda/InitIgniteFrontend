import "./DashboardPageStyling/DashboardPageStyling.scss";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardPage = () => {
	
	return (
		<SkeletonForAllPages>
			<Row className="mb-3">
				<Col xs={12}>
					<div style={{
						backgroundColor: '#DAFF7D',
						padding: '25px',
						textAlign: 'center',
						borderRadius: '30px',
					}}>
						<a href={"/dashboard/admin/edit/semesters"}> Start Semester </a>
					</div>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs={12}>
					<div style={{
						backgroundColor: '#DAFF7D',
						padding: '25px',
						textAlign: 'center',
						borderRadius: '30px',
					}}>
						<a href={"/dashboard/add/task"}>Manage Task</a>
					</div>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs={12}>
					<div style={{
						backgroundColor: '#DAFF7D',
						padding: '25px',
						textAlign: 'center',
						borderRadius: '30px',
					}}>
						<a href={"/dashboard/admin/edit/students"}>Manage Students</a>
					</div>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs={12}>
					<div style={{
						backgroundColor: '#DAFF7D',
						padding: '25px',
						textAlign: 'center',
						borderRadius: '30px',
					}}>
						Add Announcement
					</div>
				</Col>
			</Row>

		</SkeletonForAllPages>

	);

}

export default DashboardPage;