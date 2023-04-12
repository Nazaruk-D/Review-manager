import React from 'react';
import { Button, Container } from '@mui/material';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import CardsTable from './CardsTable/CardsTable';
import SettingsProfile from './SettingsProfile/SettingsProfile';

const Profile = () => {
    return (
        <Container sx={{ mt: '2rem' }}>
            <ProfileHeader />
            <SettingsProfile />
            <CardsTable />
        </Container>
    );
};

export default Profile;
