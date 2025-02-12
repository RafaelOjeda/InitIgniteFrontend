import "./DashboardPageStyling/DashboardPageStyling.scss";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboardPage = () => {
	
	return (
		<SkeletonForAllPages>
			<h1>Guest Access</h1>
		</SkeletonForAllPages>
	);

}

export default UserDashboardPage;