import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../../../styles/common/AuthContainer.module.scss';
import LoginForm from './LoginForm/LoginForm';
import Introduction from './Introduction/Introduction';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorIsLogin } from '../../../store/selectors/userSelector';
import { Path } from '../../../enums/path';

const Login = () => {
    const isLogin = useAppSelector(selectorIsLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) navigate(Path.Root);
    }, [isLogin]);

    return (
        <div className={s.authContainer}>
            <Introduction />
            <LoginForm />
        </div>
    );
};

export default Login;
