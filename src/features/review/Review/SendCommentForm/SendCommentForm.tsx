import React from 'react';
import { Avatar, Button, Grid, TextField } from '@mui/material';

const SendCommentForm = () => {
    return (
        <form noValidate autoComplete="off">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField id="comment" label="Comment" variant="outlined" fullWidth multiline rows={2} />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" disableElevation>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SendCommentForm;
