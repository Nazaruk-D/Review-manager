import React, { FC } from 'react';
import { Box, CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import s from './ReviewRow.module.scss';
import noImage from '../../../../common/png/no_image.png';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import { useDeleteReviewByIdMutation } from '../../../../store/api/reviewAPISlice';
import Loader from '../../../../common/components/Loader/Loader';

type CardsRowPropsType = {
    review: ReviewResponseType;
    index: number;
};

const ReviewRow: FC<CardsRowPropsType> = ({ review, index }) => {
    const navigate = useNavigate();
    const [deleteReview, { isLoading }] = useDeleteReviewByIdMutation();

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    const onDeleteReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteReview({ reviewId: review.id });
    };

    if (isLoading) {
        return <Loader />;
    }

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
            <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <IconButton onClick={onEditReviewHandler}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={onDeleteReviewHandler} disabled={isLoading}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default ReviewRow;
