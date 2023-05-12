import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ReviewResponseType } from '../../../../../../types/ReviewResponseType';

type InfoTitlePropsType = {
    review: ReviewResponseType;
};

const InfoTitle: FC<InfoTitlePropsType> = ({ review }) => {
    return (
        <Box sx={{ height: '35px', display: 'flex', alignItems: 'center' }}>
            <Typography gutterBottom variant="h3" component="h3" color="text.secondary" sx={{ mr: 1, mb: 0 }}>
                {review.title}
            </Typography>
            <Paper sx={{ p: 0.7, borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="body2">{review.avg_assessment.toFixed(1)}</Typography>
            </Paper>
        </Box>
    );
};

export default InfoTitle;
