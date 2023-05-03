import React, { FC, useState } from 'react';
import { Box, CircularProgress, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import s from './ReviewRow.module.scss';
import noImage from '../../../../common/png/no_image.png';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import { useDeleteReviewByIdMutation } from '../../../../store/api/reviewAPISlice';

type CardsRowPropsType = {
    review: ReviewResponseType;
    index: number;
};

const ReviewRow: FC<CardsRowPropsType> = ({ review, index }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'action' });
    const [deleteReview, { isLoading, isSuccess }] = useDeleteReviewByIdMutation();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(`/update-review/${review.id}`);
    };

    const onDeleteReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteReview({ reviewId: review.id });
        if (isSuccess) {
            setShowDeleteConfirmation(false);
        }
    };

    const onCancelDeleteReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowDeleteConfirmation(false);
    };

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setShowDeleteConfirmation(true);
    };

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
                {!showDeleteConfirmation ? (
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton onClick={onEditReviewHandler}>
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={onClickHandler} disabled={isLoading}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            <>
                                <Typography variant="body2">{t('confirm')}</Typography>
                                <Box>
                                    <IconButton onClick={onDeleteReviewHandler} disabled={isLoading}>
                                        <CheckIcon fontSize="medium" />
                                    </IconButton>
                                    <IconButton onClick={onCancelDeleteReviewHandler} disabled={isLoading}>
                                        <CloseIcon fontSize="medium" />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                    </Box>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ReviewRow;
