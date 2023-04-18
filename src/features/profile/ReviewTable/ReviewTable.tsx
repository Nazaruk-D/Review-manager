import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReviewRow from './ReviewRow/ReviewRow';
import { useGetReviewsQuery } from '../../../store/api/reviewAPI';
import { ReviewResponseType } from '../../../types/ReviewResponseType';

const ReviewTable = () => {
    const { userId = '' } = useParams<string>();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { data, isLoading, isError } = useGetReviewsQuery({ userId });
    const reviews: ReviewResponseType[] = data ? data.data : [];
    return (
        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>{t('image')}</TableCell>
                        <TableCell>{t('nameCard')}</TableCell>
                        <TableCell>{t('category')}</TableCell>
                        <TableCell>{t('createdCard')}</TableCell>
                        <TableCell>{t('rating')}</TableCell>
                        <TableCell>{t('settings')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews?.map((row, index) => (
                        <ReviewRow row={row} index={index} key={row.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReviewTable;
