import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReviewRow from './ReviewRow/ReviewRow';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { sortReviewsSelector } from '../../../store/selectors/sortSelector';
import { ReviewFilterType } from '../../../types/ReviewFilterType';
import { Sort } from '../../../enums/sort';
import { setReviewFilter } from '../../../store/slices/sortSlice';

const ReviewTable = () => {
    const dispatch = useAppDispatch();
    const sortReviews = useAppSelector(sortReviewsSelector);
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
                        <TableCell>{t('settings')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortReviews?.map((row, index) => (
                        <ReviewRow review={row} index={index} key={row.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReviewTable;
