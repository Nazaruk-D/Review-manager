import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { CommentType } from '../../../../types/CommentType';
import s from './CommentsBlock.module.scss';

const comments: CommentType[] = [
    {
        id: 'id1',
        review_id: 'id1',
        create_at: '22.02.2022',
        update_at: '23.02.2022',
        body: 'Eto testovyi comment',
        author_id: 'Ivan IvanovID',
        image: 'https://elcomercio.pe/resizer/RBz5uSuHPZ5PiUBWSx76_NmHt58=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ENZCIPYCRJEBVMRYXX2UQ2DAME.jpg',
    },
    {
        id: 'id2',
        review_id: 'id2',
        create_at: '22.02.2022',
        update_at: '23.02.2022',
        body: 'Eto testovyi comment2',
        author_id: 'Ivan Ivanov2ID',
        image: 'https://elcomercio.pe/resizer/RBz5uSuHPZ5PiUBWSx76_NmHt58=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ENZCIPYCRJEBVMRYXX2UQ2DAME.jpg',
    },
    {
        id: 'id3',
        review_id: 'id3',
        create_at: '22.02.2022',
        update_at: '23.02.2022',
        body: 'Eto testovyi comment3',
        author_id: 'Ivan IvanovID3',
        image: 'https://elcomercio.pe/resizer/RBz5uSuHPZ5PiUBWSx76_NmHt58=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ENZCIPYCRJEBVMRYXX2UQ2DAME.jpg',
    },
];

const CommentsBlock = () => {
    return (
        <Box className={s.commentContainer}>
            {comments.map((comment) => (
                <Box key={comment.id} className={s.commentBlock}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Avatar variant="rounded" alt={comment.author_id} src={comment.image} className={s.avatar} />
                        </Grid>
                        <Grid item className={s.textBlock}>
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                {comment.author_id}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {comment.create_at}
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
