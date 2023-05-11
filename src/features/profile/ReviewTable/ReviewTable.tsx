import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import ReviewRow from './ReviewRow/ReviewRow';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { sortReviewsSelector } from '../../../store/selectors/sortSelector';
import { setAppInformMessage } from '../../../store/slices/appSlice';
import { setReviewFilter } from '../../../store/slices/sortSlice';
import { selectorRole, selectorUserId } from '../../../store/selectors/userSelector';
import { useDeleteReviewByIdMutation } from '../../../store/api/reviewAPISlice';
import { Sort } from '../../../enums/sort';
import { Role } from '../../../enums/role';
import { ReviewFilterType } from '../../../types/ReviewFilterType';

const ReviewTable = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const sortReviews = useAppSelector(sortReviewsSelector);
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { t: tSnackbar } = useTranslation('translation', { keyPrefix: 'snackbar messages' });
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteReview, { isLoading, isSuccess, error }] = useDeleteReviewByIdMutation();

    const itemsPerPage = 6;
    const reviews = sortReviews || [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const onChangeFilter = (value: ReviewFilterType) => {
        dispatch(setReviewFilter(value));
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const deleteReviewHandler = (reviewId: string) => {
        deleteReview({ reviewId });
    };

    const editReviewHandler = (reviewId: string) => {
        navigate(`/update-review/${reviewId}`);
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAppInformMessage(tSnackbar('delete review')));
        }
    }, [isSuccess]);

    return (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>{t('image')}</TableCell>
                        <TableCell onClick={() => onChangeFilter(Sort.NameAZ)} sx={{ cursor: 'pointer' }}>
                            {t('name review')}
                        </TableCell>
                        <TableCell>{t('category')}</TableCell>
                        <TableCell onClick={() => onChangeFilter(Sort.DateNewOld)} sx={{ cursor: 'pointer' }}>
                            {t('created review')}
                        </TableCell>
                        <TableCell onClick={() => onChangeFilter(Sort.Assessment)} sx={{ cursor: 'pointer' }}>
                            {t('assessment')}
                        </TableCell>
                        <TableCell onClick={() => onChangeFilter(Sort.AvgRating)} sx={{ cursor: 'pointer' }}>
                            {t('rating')}
                        </TableCell>
                        <TableCell onClick={() => onChangeFilter(Sort.Likes)} sx={{ cursor: 'pointer' }}>
                            {t('like')}
                        </TableCell>
                        {currentReviews && (userID === currentReviews[0]?.author_id || isAdmin === Role.Admin) && (
                            <TableCell>{t('settings')}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentReviews?.map((row, index) => (
                        <ReviewRow
                            review={row}
                            index={startIndex + index}
                            key={row.id}
                            deleteReview={deleteReviewHandler}
                            editReview={editReviewHandler}
                            isSuccess={isSuccess}
                            isLoading={isLoading}
                        />
                    ))}
                    {currentReviews?.length === 0 && (
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', height: '100px' }} colSpan={9}>
                                <Typography variant="h3"> {t('no reviews found')}</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
};

export default ReviewTable;
