import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useSetLikeMutation } from '../../../store/api/reviewAPISlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { selectorIsLogin } from '../../../store/selectors/userSelector';
import { setAppErrorAC } from '../../../store/slices/appSlice';

type LikePropsType = {
    userId: string;
    reviewId: string;
    likes: string[];
};

const Like: FC<LikePropsType> = ({ userId, reviewId, likes }) => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectorIsLogin);
    const [setLike, { error }] = useSetLikeMutation();
    const [likeCount, setLikeCount] = useState<number>(likes.length);
    const [isLiked, setIsLiked] = useState<boolean>(likes.includes(userId));

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        setLike({ userId, reviewId });
    };

    useEffect(() => {
        if (error) {
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
            dispatch(setAppErrorAC('Like not set'));
        }
    }, [error]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">{likeCount}</Typography>
            <IconButton onClick={onClickHandler} disabled={!isLogin}>
                <Favorite style={{ color: isLiked ? 'red' : '', fontSize: '22px' }} />
            </IconButton>
        </Box>
    );
};

export default Like;
