import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
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
    const { t } = useTranslation('translation', { keyPrefix: 'action' });

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(event.currentTarget.value);
    };

    const onClickHandler = () => {
        setLoading(true);
        sendComment(comment);
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
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
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" disableElevation onClick={onClickHandler}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : t('send')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SendCommentForm;
