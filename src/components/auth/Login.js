import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserContext from '../../context/user/UserContext';

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        try {
            const { data } = await axios.post("http://localhost:8000/api/auth/login", { email: formData.get('email'), password: formData.get('password') }, { withCredentials: true })
            // console.log(data.user)
            setUser(data.user)
            // navigate("/");
        } catch (error) {
            console.log(error.request.response);
        }
    };

    const handleGoogleSignin = (event) => {
        event.preventDefault();
        window.open("http://localhost:8000/api/auth/google", "_self");
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <GoogleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={handleGoogleSignin}
                        >
                            Sign In using
                            <GoogleIcon sx={{ ml: 1 }} />
                        </Button>
                        <Grid container>
                            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
                                <Link onClick={() => navigate("/signup")} variant="body2" sx={{ cursor: 'pointer' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}