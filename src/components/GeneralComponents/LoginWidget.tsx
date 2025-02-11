import { useState, useEffect } from 'react';
import { TextField, Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthServiceInstance, {UserEmailAndPass} from './AuthService.tsx';


const LoginWidget = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [missingInfoMessage, setMissingInfoMessage] = useState("");
    const [badCredentialsMessage, setBadCredentialsMessage] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("login_token")) {
            navigate("/dashboard");
        }
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMissingInfoMessage('Please fill out all the fields!');
            return;
        }

        const userEmailAndPass: UserEmailAndPass = { email, password };

        // TODO: Hash the password on the frontend before sending it.

        try {
            const userToken = await AuthServiceInstance.loginUser(userEmailAndPass);

            // Null/Undefined Check: Improved
            if (!userToken || !userToken.email || !userToken.token || !userToken.name) {  // Check all essential properties
                setBadCredentialsMessage('Incorrect email or password or missing data!'); // More informative message
                console.error("Invalid user token received:", userToken); // Log the invalid token for debugging
                return; // Stop the login process
            }

            const token = userToken.token.replace(/"/g, '');
            const emailClean = userToken.email.replace(/"/g, '');
            const nameClean = userToken.name.replace(/"/g, '');

            sessionStorage.setItem('login_token', token);
            sessionStorage.setItem('user_email', emailClean);
            sessionStorage.setItem('name', nameClean);

            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            setBadCredentialsMessage('An error occurred during login. Please try again later.');
        }
    };

    return (
        <Container>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <TextField
                        className="form-control"
                        id="userEmail"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        margin="normal"
                        size="small"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        className="form-control"
                        id="userPassword"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        margin="normal"
                        size="small"
                    />
                </div>
                <Box sx={{ bgcolor: "white", width: '200px', borderRadius: '15px', marginLeft: '175px'}}>
                    {missingInfoMessage && (
                        <Typography variant="body2" color="error" align="center">
                            {missingInfoMessage}
                        </Typography>


                    )}
                    {badCredentialsMessage && (
                        <Typography variant="body2" color="error" align="center">
                            {badCredentialsMessage}
                        </Typography>
                    )}
                </Box>
                <Box sx={{
                    mt: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <button className="btn btn-success" type="submit" variant="contained" style={{ marginRight: '0.5rem' }}>Login</button>
                    <button className="btn btn-primary" type="button" onClick={() => navigate('/register')} variant="contained" style={{ marginRight: '0.5rem' }}>Sign up for free now!</button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/forgot-password')} variant="contained">Forgot password?</button>
                </Box>
            </form>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
            }}>
                <button className="btn btn-info" onClick={() => navigate('/')} variant="contained">Return to Home</button>
            </Box>
        </Container>
    );
};

export default LoginWidget;