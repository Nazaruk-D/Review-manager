import React from 'react';
import { Box } from '@mui/material';
import s from '../AuthContainer.module.scss';
import Introduction from '../login/Introduction/Introduction';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const Registration = () => {
    return (
        <Box className={s.authContainer}>
            <Introduction />
            <RegistrationForm />
        </Box>
    );
};

export default Registration;
