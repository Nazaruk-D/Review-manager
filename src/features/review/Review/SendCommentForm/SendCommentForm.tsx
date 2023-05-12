import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useTranslation } from 'react-i18next';

type SendCommentFormPropsType = {
    ws: Socket<DefaultEventsMap, DefaultEventsMap>;
    sendComment: (comment: string) => void;
};

const SendCommentForm: FC<SendCommentFormPropsType> = ({ ws, sendComment }) => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation('translation', { keyPrefix: 'action' });

    const validateComment = (message: string) => {
        if (!message) {
            setError('Comment should not be empty');
        } else if (message.length > 100) {
            setError('Comment should not exceed 100 characters');
        } else {
            setError('');
        }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        setComment(value);
        validateComment(value);
    };

    const onClickHandler = () => {
        if (!error) {
            setLoading(true);
            sendComment(comment);
            setComment('');
        }
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !error) {
            event.preventDefault();
            setLoading(true);
            sendComment(comment);
            setComment('');
        }
    };

    useEffect(() => {
        if (ws) {
            ws.on('commentAdded', () => {
                setComment('');
                setLoading(false);
            });
        }
    }, [ws]);

    return (
        <form noValidate autoComplete="off">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField
                        id="comment"
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        value={comment}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                    {error && <Box sx={{ color: 'red' }}>{error}</Box>}
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={onClickHandler}
                        sx={{ width: '125px' }}
                        disabled={comment.length < 1 || error !== ''}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : t('send')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SendCommentForm;
