import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

type EditReviewButtonPropsType = {
    reviewId: string;
};

const EditReviewButton: FC<EditReviewButtonPropsType> = ({ reviewId }) => {
    const navigate = useNavigate();

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(`/update-review/${reviewId}`);
    };
    return (
        <IconButton onClick={onEditReviewHandler}>
            <EditOutlinedIcon />
        </IconButton>
    );
};

export default EditReviewButton;
