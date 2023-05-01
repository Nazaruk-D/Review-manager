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

const Profile = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectorIsLogin);
    const navigate = useNavigate();
    const { userId = '' } = useParams<string>();
    const { data: tags, isLoading: tagsLoading, error: tagsError } = useGetTagsQuery({});
    const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useGetReviewsQuery({ userId });

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

    if (tagsLoading || reviewsLoading) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <ProfileHeader />
            <NewReviewButton userId={userId} />
            <FilterSortPanel />
            <ReviewTable />
        </Container>
    );
};

export default Profile;
