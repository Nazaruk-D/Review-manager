import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ReviewTable from './ReviewTable/ReviewTable';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectorIsLogin } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';
import { useGetTagsQuery } from '../../store/api/itemAPI';
import { setTags, setUsersReview } from '../../store/slices/reviewSlice';
import NewReviewButton from './NewReviewButton/NewReviewButton';
import FilterSortPanel from './FilterSortPanel/FilterSortPanel';
import { useGetReviewsQuery } from '../../store/api/reviewAPISlice';
import Loader from '../../common/components/Loader/Loader';
import { useGetUserQuery } from '../../store/api/userAPISlice';
import { setAppErrorAC } from '../../store/slices/appSlice';
import { setUserData } from '../../store/slices/adminSlice';

const Profile = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectorIsLogin);
    const navigate = useNavigate();
    const { userId = '' } = useParams<string>();
    const { data: tags, isLoading: tagsLoading, error: tagsError } = useGetTagsQuery({});
    const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useGetReviewsQuery({ userId });
    const { data: user, isLoading: userLoading, error: userError } = useGetUserQuery({ userId });

    if (tagsError && reviewsError && userError) {
        dispatch(setAppErrorAC('error'));
    }

    useEffect(() => {
        if (user) {
            dispatch(setUserData(user.data));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (reviews) {
            dispatch(setUsersReview(reviews.data));
        }
    }, [dispatch, reviews]);

    useEffect(() => {
        if (tags) {
            dispatch(setTags(tags.data));
        }
    }, [dispatch, tags]);

    useEffect(() => {
        if (!isLogin) navigate(Path.Root);
    }, [isLogin]);

    if (tagsLoading || reviewsLoading || userLoading || !user) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <ProfileHeader userProfileData={user.data} />
            <NewReviewButton userId={userId} />
            <FilterSortPanel />
            <ReviewTable />
        </Container>
    );
};

export default Profile;
