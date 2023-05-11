import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ReviewTable from './ReviewTable/ReviewTable';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../store/selectors/userSelector';
import { useGetProductNamesQuery, useGetTagsQuery } from '../../store/api/itemAPI';
import { setProductNames, setTags, setUsersReview } from '../../store/slices/reviewSlice';
import NewReviewButton from './NewReviewButton/NewReviewButton';
import FilterSortPanel from './FilterSortPanel/FilterSortPanel';
import { useGetReviewsQuery } from '../../store/api/reviewAPISlice';
import Loader from '../../common/components/Loader/Loader';
import { useGetUserQuery } from '../../store/api/userAPISlice';
import { setAppErrorAC } from '../../store/slices/appSlice';
import { setUserData } from '../../store/slices/adminSlice';
import { Role } from '../../enums/role';

const Profile = () => {
    const dispatch = useAppDispatch();
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);
    const { userId = '' } = useParams<string>();
    const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useGetReviewsQuery({ userId });
    const { data: user, isLoading: userLoading, error: userError } = useGetUserQuery({ userId });

    if (reviewsError || userError) {
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

    if (reviewsLoading || userLoading || !user) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <ProfileHeader userProfileData={user.data} />
            {(userID === userId || isAdmin === Role.Admin) && <NewReviewButton userId={userId} />}
            <FilterSortPanel />
            <ReviewTable />
        </Container>
    );
};

export default Profile;
