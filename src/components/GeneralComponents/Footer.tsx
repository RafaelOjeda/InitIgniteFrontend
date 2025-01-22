//import { useNavigate } from 'react-router-dom'

const Footer = () => {
	//const navigate = useNavigate();
	const footerStyle = {
		backgroundColor: "#E7ECEF",
		justifyContent: "center",
	}
    return (
		
		<footer className="row p-3 m-0" style={footerStyle}>
			<a className="col-md-3"></a>
			<a className="col-md-2">by Rafael Ojeda</a>
			<a href="mailto:example@example.com" className="col-md-2"> Contact Us</a>
		</footer>
		
    );
}

export default Footer;