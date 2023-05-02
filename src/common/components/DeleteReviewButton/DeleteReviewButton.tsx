import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDeleteReviewByIdMutation } from '../../../store/api/reviewAPISlice';

type DeleteReviewButtonPropsType = {
    reviewId: string;
};

const DeleteReviewButton: FC<DeleteReviewButtonPropsType> = ({ reviewId }) => {
    const [deleteReview, { isLoading }] = useDeleteReviewByIdMutation();

    const onDeleteReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteReview({ reviewId });
    };
    return (
        <IconButton onClick={onDeleteReviewHandler} disabled={isLoading}>
            <DeleteOutlineOutlinedIcon />
        </IconButton>
    );
};

export default DeleteReviewButton;
