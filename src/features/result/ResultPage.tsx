import React, { useCallback, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectorSearchValue } from '../../store/selectors/reviewSelector';
import { useGetSearchResultQuery, useLazyGetSearchResultQuery } from '../../store/api/itemAPI';
import ReviewItem from '../../common/components/ReviewItem/ReviewItem';
import Loader from '../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../store/slices/appSlice';
import SearchReview from '../../common/components/SearchReview/SearchReview';
import { setSearch } from '../../store/slices/reviewSlice';
import SelectCategory from '../../common/components/SelectCategory/SelectCategory';

const ResultPage = () => {
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(selectorSearchValue);
    const { data: reviews, isFetching, isError } = useGetSearchResultQuery({ searchValue }, { skip: searchValue === '' });
    const [getReviews] = useLazyGetSearchResultQuery();

    const formik = useFormik({
        initialValues: {
            category: '',
        },
        onSubmit: async (values) => {},
    });

    const onSearchQuery = useCallback(
        (value: string) => {
            dispatch(setSearch(value));
            if (value !== '') {
                getReviews({ searchValue: value });
            }
        },
        [dispatch, getReviews],
    );

    useEffect(() => {
        if (isError) {
            dispatch(setAppErrorAC('Error loading data'));
        }
    }, [dispatch, isError]);

    if (isFetching) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <Grid container>
                <Grid item xs={3} sx={{ mr: 1 }}>
                    <SearchReview search={onSearchQuery} />
                </Grid>
                <Grid item xs={3}>
                    <SelectCategory formik={formik} />
                </Grid>
            </Grid>

            {reviews &&
                reviews.data.map((review) => (
                    <ReviewItem key={review.id} review={review} flexDirection="row" mediaWidth="30%" contentWidth="70%" />
                ))}
        </Container>
    );
};

export default ResultPage;
