import React from 'react';
import { Container } from '@mui/material';
import Search from '../../common/components/Search/Search';
import Posters from '../posters/Posters';

const MainPage = () => {
    return (
        <Container sx={{ mt: '1rem' }}>
            <Search />
            <Posters />
        </Container>
    );
};

export default MainPage;
