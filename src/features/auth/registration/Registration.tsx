import React from 'react';
import s from '../AuthContainer.module.scss';
import Introduction from '../login/Introduction/Introduction';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const Registration = () => {
    return (
        <div className={s.authContainer}>
            <Introduction />
            <RegistrationForm />
        </div>
    );
};

export default Registration;
