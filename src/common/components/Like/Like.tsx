import React, { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useSetLikeMutation } from '../../../store/api/reviewAPISlice';

type LikePropsType = {
    userId: string;
    reviewId: string;
    likes: string[];
};

const Like: FC<LikePropsType> = ({ userId, reviewId, likes }) => {
    const [setLike] = useSetLikeMutation();

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setLike({ userId, reviewId });
    };

    const isLiked = likes.includes(userId);

    console.log('userId: ', userId);
    console.log('reviewId: ', reviewId);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">{likes.length}</Typography>
            <IconButton onClick={onClickHandler}>
                <Favorite style={{ color: isLiked ? 'red' : '', fontSize: '22px' }} />
            </IconButton>
        </Box>
    );
};

export default Like;
