import React from 'react';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import s from './LoginForm.module.scss';
import { Path } from '../../../../enums/path';
import { useLoginMutation, useSocialLoginMutation } from '../../../../store/api/authAPI';
import { useAppDispatch } from '../../../../hooks/useRedux';

const supabase = createClient(
    'https://aprlrxbbzpblszqgsegy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmxyeGJienBibHN6cWdzZWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NjUxNzUsImV4cCI6MTk5NzA0MTE3NX0.L465Hij8NrxrRe0aUgWz8IsZyd-mNjE-E1xrnggaSmE',
);

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const [loginSocial] = useSocialLoginMutation();
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    supabase.auth.onAuthStateChange(async (event) => {
        if (event === 'SIGNED_IN') {
            navigate(Path.Root);
        }
    });

    return (
        <Paper elevation={3} className={s.loginFormContainer}>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                providers={['facebook', 'google', 'discord', 'github']}
            />
        </Paper>
    );
};

export default LoginForm;
