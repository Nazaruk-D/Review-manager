import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Pagination } from '@mui/lab';
import { Path } from '../../enums/path';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectorSearchValue } from '../../store/selectors/reviewSelector';
import { useGetSearchResultQuery } from '../../store/api/itemAPI';
import ReviewItem from '../../common/components/ReviewItem/ReviewItem';
import Loader from '../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../store/slices/appSlice';

const ResultPage = () => {
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(selectorSearchValue);
    const { t } = useTranslation('translation', { keyPrefix: 'result' });
    const { data, isFetching, isError } = useGetSearchResultQuery({ searchValue }, { skip: searchValue === '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const reviews = data?.data || [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

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
            {reviews.length > 0 && (
                <Typography variant="h6" sx={{ mb: 1 }}>
                    {t('on request')} <span style={{ fontWeight: 600 }}>{`${searchValue}`}</span>, {t('found')} {reviews.length}{' '}
                </Typography>
            )}
            {currentReviews &&
                currentReviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        flexDirection="row"
                        mediaWidth="30%"
                        contentWidth="70%"
                        paddingLeft={0}
                    />
                ))}
            {reviews.length === 0 && (
                <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography component="div" variant="h2">
                        {t('no found')}
                    </Typography>
                </Box>
            )}
            <Box>
                <Pagination
                    count={Math.ceil(reviews.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    color="standard"
                    size="large"
                    sx={{ mt: 1, mb: 1 }}
                />
            </Box>
            {!reviews && (
                <NavLink to={Path.Root} style={{ textDecoration: 'none' }}>
                    {' '}
                    <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography component="div" variant="h2">
                            {t('return')}
                        </Typography>
                    </Box>
                </NavLink>
            )}
        </Container>
    );
};

export default ResultPage;
