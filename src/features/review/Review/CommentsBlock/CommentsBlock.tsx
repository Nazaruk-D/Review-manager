import React, { FC, useEffect, useState } from 'react';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import ClearIcon from '@mui/icons-material/Clear';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import s from './CommentsBlock.module.scss';
import { useDeleteCommentMutation, useGetCommentsQuery, useLazyGetCommentsQuery } from '../../../../store/api/itemAPI';
import { CommentType } from '../../../../types/CommentType';

type CommentsBlockPropsType = {
    ws: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const CommentsBlock: FC<CommentsBlockPropsType> = ({ ws }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const { reviewId = '' } = useParams<string>();
    const { data, error, isLoading } = useGetCommentsQuery({ reviewId });
    const [getComments] = useLazyGetCommentsQuery();
    const [deleteComment] = useDeleteCommentMutation();

    const onClickHandler = (id: string) => {
        deleteComment({ id });
    };

    useEffect(() => {
        if (data) {
            setComments(data.data);
        }
    }, [data]);

    useEffect(() => {
        if (ws) {
            ws.on('commentAdded', () => {
                getComments({ reviewId });
            });
        }
    }, [ws]);

    return (
        <Box className={s.commentContainer}>
            {comments.map((comment: CommentType) => (
                <Box key={comment.id} className={s.commentBlock}>
                    <Grid container alignItems="center" className={s.commentGrid}>
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
                            <IconButton className={s.deleteButton} onClick={() => onClickHandler(comment.id)}>
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default CommentsBlock;
