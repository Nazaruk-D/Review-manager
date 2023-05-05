import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ReviewRow from './ReviewRow/ReviewRow';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { sortReviewsSelector } from '../../../store/selectors/sortSelector';
import { ReviewFilterType } from '../../../types/ReviewFilterType';
import { Sort } from '../../../enums/sort';
import { setReviewFilter } from '../../../store/slices/sortSlice';
import { selectorRole, selectorUserId } from '../../../store/selectors/userSelector';
import { Role } from '../../../enums/role';

const ReviewTable = () => {
    const dispatch = useAppDispatch();
    const sortReviews = useAppSelector(sortReviewsSelector);
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    const onChangeFilter = (value: ReviewFilterType) => {
        dispatch(setReviewFilter(value));
    };

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
                        {sortReviews && (userID === sortReviews[0].author_id || isAdmin === Role.Admin) && (
                            <TableCell>{t('settings')}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortReviews?.map((row, index) => (
                        <ReviewRow review={row} index={index} key={row.id} />
                    ))}
                    {sortReviews?.length === 0 && (
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', height: '100px' }} colSpan={9}>
                                <Typography variant="h3"> {t('no reviews found')}</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReviewTable;
