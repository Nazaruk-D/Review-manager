import React from 'react';
import s from '../../../styles/common/AuthContainer.module.scss';
import LoginForm from './LoginForm/LoginForm';
import Introduction from './Introduction/Introduction';

const Login = () => {
    return (
        <div className={s.authContainer}>
            <Introduction />
            <LoginForm />
        </div>
    );
};

export default Login;
