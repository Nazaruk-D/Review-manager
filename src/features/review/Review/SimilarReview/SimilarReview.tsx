import React, { FC } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';

type SimilarReviewPropsType = {
    review: ReviewResponseType;
};

const SimilarReview: FC<SimilarReviewPropsType> = ({ review }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'similar review' });

    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {t('similar review')}
            </Typography>
            <Grid container spacing={2}>
                {review?.similarReview.map((similarReview) => (
                    <Grid item key={similarReview.id} xs={12} md={4}>
                        <Card
                            sx={{
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                },
                            }}
                        >
                            <NavLink to={`/review/${similarReview.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <CardContent>
                                    <Typography variant="h6">{similarReview.review_title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {t('author')} {similarReview.author_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {t('rating')} {similarReview.avg_rating}
                                    </Typography>
                                </CardContent>
                            </NavLink>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SimilarReview;
