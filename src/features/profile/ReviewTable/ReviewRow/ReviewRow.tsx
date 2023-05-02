import React, { FC } from 'react';
import { Box, TableCell, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import s from './ReviewRow.module.scss';
import noImage from '../../../../common/png/no_image.png';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import EditReviewButton from '../../../../common/components/EditReviewButton/EditReviewButton';
import DeleteReviewButton from '../../../../common/components/DeleteReviewButton/DeleteReviewButton';

type CardsRowPropsType = {
    review: ReviewResponseType;
    index: number;
};

const ReviewRow: FC<CardsRowPropsType> = ({ review, index }) => {
    const navigate = useNavigate();

    return (
        <TableRow className={s.row} onClick={() => navigate(`/review/${review.id}`)}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <img src={review.image ? review.image : noImage} alt={review.title} className={s.image} />
            </TableCell>
            <TableCell>{review.review_title}</TableCell>
            <TableCell>{review.category}</TableCell>
            <TableCell>{dateFormat(review.created_at, 'mm/dd/yyyy')}</TableCell>
            <TableCell>{review.assessment}</TableCell>
            <TableCell>{review.avg_rating ? review.avg_rating : '-'}</TableCell>
            <TableCell>{review.likes.length}</TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <EditReviewButton reviewId={review.id} />
                    <DeleteReviewButton reviewId={review.id} />
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default ReviewRow;
