import { useState, useEffect } from 'react';
import { TextField, Box, Container, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthServiceInstance, { UserEmailAndPass } from './AuthService.tsx';

const LoginWidget = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [missingInfoMessage, setMissingInfoMessage] = useState('');
    const [badCredentialsMessage, setBadCredentialsMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            checkAdminStatusAndRedirect(token);
        }
    }, []);

    const checkAdminStatusAndRedirect = async (token: string) => {
        try {
            const isAdmin = await AuthServiceInstance.isAdmin({ uid: token });
            const redirectUrl = sessionStorage.getItem('redirectUrl');
            sessionStorage.removeItem('redirectUrl');

            if (isAdmin) {
                console.log("Being redirected to: " + redirectUrl);
                navigate(redirectUrl || '/dashboard/admin');
            } else {
                console.log("Being redirected to: " + redirectUrl);
                navigate(redirectUrl || '/dashboard/user');
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            navigate('/');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMissingInfoMessage('Please fill out all the fields!');
            return;
        }

        const userEmailAndPass: UserEmailAndPass = { email, password };

        setIsLoading(true);
        setMissingInfoMessage(''); // Clear previous messages
        setBadCredentialsMessage('');

        try {
            const userToken = await AuthServiceInstance.loginUser(userEmailAndPass);

            if (!userToken || !userToken.email || !userToken.token || !userToken.name) {
                setBadCredentialsMessage('Incorrect email or password or missing data!');
                console.error('Invalid user token received:', userToken);
                return;
            }

            const token = userToken.token.replaceAll('"', '');
            const emailClean = userToken.email.replaceAll('"', '');
            const nameClean = userToken.name.replaceAll('"', '');

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user_email', emailClean);
            sessionStorage.setItem('name', nameClean);

            await checkAdminStatusAndRedirect(token);

        } catch (error) {
            console.error('Login error:', error);
            if (error.message.includes("Invalid credentials")) {
                setBadCredentialsMessage('Incorrect email or password.');
            } else if (error.message.includes("Network Error")) {
                setBadCredentialsMessage('A network error occurred. Please try again later.');
            } else {
                setBadCredentialsMessage('An error occurred during login. Please try again later.');
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <form onSubmit={handleLogin}>
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
                    error={!!missingInfoMessage || !!badCredentialsMessage}
                    helperText={missingInfoMessage || badCredentialsMessage}
                />
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
                    error={!!missingInfoMessage || !!badCredentialsMessage}
                    helperText={missingInfoMessage || badCredentialsMessage}
                />

                <Box sx={{
                    mt: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <button className="btn btn-success" type="submit" variant="contained" disabled={isLoading} style={{ marginRight: '0.5rem' }}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                    <button className="btn btn-primary" type="button" onClick={() => navigate('/register')} variant="contained" style={{ marginRight: '0.5rem' }}>Sign up for free now!</button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/forgot-password')} variant="contained">Forgot password?</button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                }}>
                    <button className="btn btn-info" onClick={() => navigate('/')} variant="contained">Return to Home</button>
                </Box>
            </form>
        </Container>
    );
};

export default LoginWidget;