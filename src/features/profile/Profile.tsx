import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ReviewTable from './ReviewTable/ReviewTable';
import SettingsProfile from './SettingsProfile/SettingsProfile';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectorIsLogin } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';
import { useGetTagsQuery } from '../../store/api/itemAPI';
import { setTags } from '../../store/slices/reviewSlice';

const Profile = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectorIsLogin);
    const navigate = useNavigate();
    const { userId = '' } = useParams<string>();
    const { data, isLoading, error } = useGetTagsQuery({});

    useEffect(() => {
        if (data) {
            dispatch(setTags(data.data));
        }
    }, [dispatch, data]);

    useEffect(() => {
        if (!isLogin) navigate(Path.Root);
    }, [isLogin]);

    return (
        <Container sx={{ mt: '2rem' }}>
            <ProfileHeader />
            <SettingsProfile userId={userId} />
            <ReviewTable />
        </Container>
    );
};

export default Profile;
