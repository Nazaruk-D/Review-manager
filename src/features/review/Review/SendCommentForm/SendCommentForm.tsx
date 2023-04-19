import React, { ChangeEvent, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation, useGetCommentsQuery } from '../../../../store/api/commentAPI';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectorUserId } from '../../../../store/selectors/userSelector';

const SendCommentForm = () => {
    const { reviewId } = useParams<string>();
    const userId = useAppSelector(selectorUserId);
    const [comment, setComment] = useState('');
    const [sendComment, { isLoading, isError, isSuccess }] = useCreateCommentMutation();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    };

    const onClickHandler = async () => {
        if (reviewId && userId && comment) {
            await sendComment({ review_id: reviewId, author_id: userId, body: comment });
            if (isSuccess) {
                setComment('');
                useGetCommentsQuery({ reviewId });
            }
        }
    };

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
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" disableElevation onClick={onClickHandler}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SendCommentForm;
