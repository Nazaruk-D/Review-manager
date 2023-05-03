import React, { FC, useEffect, useState } from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import s from './CommentsBlock.module.scss';
import { useGetCommentsQuery, useLazyGetCommentsQuery } from '../../../../store/api/itemAPI';
import { CommentType } from '../../../../types/CommentType';

type CommentsBlockPropsType = {
    ws: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const CommentsBlock: FC<CommentsBlockPropsType> = ({ ws }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const { reviewId = '' } = useParams<string>();
    const { data, error, isLoading } = useGetCommentsQuery({ reviewId });
    const [getComments] = useLazyGetCommentsQuery();

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
