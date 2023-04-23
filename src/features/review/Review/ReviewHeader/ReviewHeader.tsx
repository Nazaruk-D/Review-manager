import React, { FC } from 'react';
import { Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import dateFormat from 'dateformat';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import s from './ReviewHeader.module.scss';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import { Path } from '../../../../enums/path';

type ReviewHeaderPropsType = {
    review: ReviewResponseType;
};

const ReviewHeader: FC<ReviewHeaderPropsType> = ({ review }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { t: tr } = useTranslation('translation', { keyPrefix: 'review editor' });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <img
                    src={
                        review.image
                            ? review.image
                            : 'https://consultix.radiantthemes.com/demo-nine/wp-content/themes/consultix/images/no-image-found-360x250.png'
                    }
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
                <Typography variant="h4" gutterBottom>
                    {review.review_title}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {review.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {tr('category')}: {review.category}
                </Typography>
                <Typography variant="body1">
                    {' '}
                    {tr("author's assessment")}: {review.rating}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {tr('created by')} {review.author_name} {tr('on')} {dateFormat(review.created_at, 'mm/dd/yyyy')}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ReviewHeader;
