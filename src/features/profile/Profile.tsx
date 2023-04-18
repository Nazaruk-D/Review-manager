import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ReviewTable from './ReviewTable/ReviewTable';
import SettingsProfile from './SettingsProfile/SettingsProfile';
import { useAppSelector } from '../../hooks/useRedux';
import { selectorIsLogin } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';

const Profile = () => {
    const isLogin = useAppSelector(selectorIsLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate(Path.Root);
    }, [isLogin]);
    return (
        <Container sx={{ mt: '2rem' }}>
            <ProfileHeader />
            <SettingsProfile />
            <ReviewTable />
        </Container>
    );
};

export default Profile;
