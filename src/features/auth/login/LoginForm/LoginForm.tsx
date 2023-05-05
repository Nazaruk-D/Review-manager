import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { Provider } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import DiscordIcon from '../../../../common/svg/discord.svg';
import s from './LoginForm.module.scss';
import { Path } from '../../../../enums/path';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { supabase } from '../../../../utils/supabase';
import { getUserData } from '../../../../utils/getUserData';
import { setAppErrorAC } from '../../../../store/slices/appSlice';
import { authValidation } from '../../authValidation';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [inProgress, setInProgress] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });
    const { t: tValidation } = useTranslation('translation', { keyPrefix: 'validation' });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => authValidation(values, tValidation),
        onSubmit: async (values) => {
            try {
                setInProgress(true);
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: values.email,
                    password: values.password,
                });
                if (!error) {
                    await getUserData(dispatch);
                    navigate(Path.Root);
                } else {
                    dispatch(setAppErrorAC(error.message));
                }
                setInProgress(false);
            } catch (err) {
                dispatch(setAppErrorAC('Unknown error occurred'));
                setInProgress(false);
            }
        },
    });

    const signInWithSocial = useCallback(async (social: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: social,
        });
        if (error) {
            dispatch(setAppErrorAC(error.message));
        }
    }, []);

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
                        autoComplete="email"
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
                        autoComplete="current-password"
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
                        {inProgress ? <CircularProgress size={24} color="inherit" /> : t('signIn')}
                    </Button>
                </form>
                <Grid container spacing={2}>
                    <Grid item xs={6} onClick={() => signInWithSocial('facebook')}>
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
                    <Grid item xs={6} onClick={() => signInWithSocial('discord')}>
                        <Button variant="contained" color="primary" fullWidth sx={{ mt: '20px' }}>
                            <img src={DiscordIcon} alt="DiscordIcon" />
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
                                Discord
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
