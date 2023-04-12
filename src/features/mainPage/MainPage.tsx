import React from 'react';
import { Container } from '@mui/material';
import Posters from '../posters/Posters';

const MainPage = () => {
    return (
        <Container sx={{ mt: '1rem' }}>
            <Posters />
        </Container>
    );
};

export default MainPage;
