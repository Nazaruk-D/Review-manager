import React, { FC } from 'react';
import { Grid } from '@mui/material';

type ReviewTextPropsType = {
    body: string;
};

const ReviewText: FC<ReviewTextPropsType> = ({ body }) => {
    return (
        <Grid item xs={12}>
            {body}
        </Grid>
    );
};

export default ReviewText;
