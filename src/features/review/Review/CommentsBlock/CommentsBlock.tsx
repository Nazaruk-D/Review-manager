import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import s from './CommentsBlock.module.scss';
import { useCreateCommentMutation, useGetCommentsQuery } from '../../../../store/api/itemAPI';
import { CommentType } from '../../../../types/CommentType';

const CommentsBlock = () => {
    const { reviewId = '' } = useParams<string>();
    const { data, error, isLoading } = useGetCommentsQuery({ reviewId });
    const comments: CommentType[] = data ? data.data : [];

    return (
        <Box className={s.commentContainer}>
            {comments.map((comment: CommentType) => (
                <Box key={comment.id} className={s.commentBlock}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Avatar variant="rounded" alt="small photo" src={comment.users.small_photo} className={s.avatar} />
                        </Grid>
                        <Grid item className={s.textBlock}>
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                {comment.users.user_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {dateFormat(comment.updated_at, 'mmmm dS, yyyy, h:MM:ss TT')}
                            </Typography>
                            <Typography variant="body1">{comment.body}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default CommentsBlock;
