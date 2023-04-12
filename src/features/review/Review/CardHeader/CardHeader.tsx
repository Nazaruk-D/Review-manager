import React from 'react';
import { Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import s from './CardHeader.module.scss';

const CardHeader = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <img
                    src="https://i.pinimg.com/736x/70/5b/bb/705bbb820c7332b04d619f7536645753.jpg"
                    alt="test"
                    className={s.image}
                    style={{
                        width: isMobile ? '100%' : '90%',
                        display: isMobile ? 'block' : 'inline-block',
                        marginTop: isMobile ? '1rem' : 0,
                    }}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                    title
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Created by creator on dateCreated
                </Typography>
                <Typography variant="body1">description</Typography>
                <Grid>Tags block</Grid>
            </Grid>
        </Grid>
    );
};

export default CardHeader;
