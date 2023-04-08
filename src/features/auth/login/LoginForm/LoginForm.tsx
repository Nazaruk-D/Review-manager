import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslation } from 'react-i18next';
import s from './LoginForm.module.scss';
import { Path } from '../../../../enums/path';
import { LoginErrorType } from '../../../../types/AuthErrorType';

const LoginForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: LoginErrorType = {};
            if (!values.email) {
                errors.email = 'Email required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be min 6 characters long.';
            }
            return errors;
        },
        onSubmit: (values) => {
            console.log(values);
            formik.resetForm();
        },
    });
    return (
        <Paper elevation={3} className={s.loginFormContainer}>
            <Box className={s.loginFormBlock}>
                <Typography
                    variant="h4"
                    noWrap
                    component="h4"
                    sx={{
                        mr: 2,
                        display: 'flex',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    {t('signIn')}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="email"
                        label="Email"
                        className={s.input}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="password"
                        label="Password"
                        type="password"
                        className={s.input}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: '20px' }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Login
                    </Button>
                </form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" fullWidth sx={{ mt: '20px' }}>
                            <FacebookOutlinedIcon />
                            <Typography
                                variant="body1"
                                noWrap
                                component="p"
                                sx={{
                                    mr: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 400,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                    ml: 1,
                                }}
                            >
                                Facebook
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" fullWidth sx={{ mt: '20px' }}>
                            <LinkedInIcon />
                            <Typography
                                variant="body1"
                                noWrap
                                component="p"
                                sx={{
                                    mr: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 400,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                    ml: 1,
                                }}
                            >
                                LinkedIn
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: '10px' }}>
                    <Grid item xs={5}>
                        <hr />
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                        {t('or')}
                    </Grid>
                    <Grid item xs={5}>
                        <hr />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: '20px' }} onClick={() => navigate(Path.Register)}>
                    {t('signUp')}
                </Button>
            </Box>
        </Paper>
    );
};

export default LoginForm;
