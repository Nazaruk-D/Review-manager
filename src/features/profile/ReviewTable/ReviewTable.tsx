import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReviewRow from './ReviewRow/ReviewRow';
import { useGetReviewsQuery } from '../../../store/api/reviewAPISlice';
import Loader from '../../../common/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setUsersReview } from '../../../store/slices/reviewSlice';
import { selectorUserReviews } from '../../../store/selectors/reviewSelector';

const ReviewTable = () => {
    const dispatch = useAppDispatch();
    const reviews = useAppSelector(selectorUserReviews);
    const { userId = '' } = useParams<string>();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { data, isLoading, error } = useGetReviewsQuery({ userId });

    useEffect(() => {
        if (data) {
            dispatch(setUsersReview(data.data));
        }
    }, [dispatch, data]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>{t('image')}</TableCell>
                        <TableCell>{t('name review')}</TableCell>
                        <TableCell>{t('category')}</TableCell>
                        <TableCell>{t('created review')}</TableCell>
                        <TableCell>{t('rating')}</TableCell>
                        <TableCell>{t('settings')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews?.map((row, index) => (
                        <ReviewRow review={row} index={index} key={row.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReviewTable;
