import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../../enums/path';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';

type ReviewDescriptionPropsType = {
    review: ReviewResponseType;
};

const ReviewDescription: FC<ReviewDescriptionPropsType> = ({ review }) => {
    const { t: tr } = useTranslation('translation', { keyPrefix: 'review editor' });

    return (
        <Grid container sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} sx={{ mb: 1 }}>
                {review.tags!.length > 0 && (
                    <>
                        {tr('tags')}:{' '}
                        {review.tags?.map((tag) => (
                            <NavLink key={tag} to={Path.Root}>
                                #{tag}
                                <span>, </span>
                            </NavLink>
                        ))}
                    </>
                )}
            </Grid>
            <Grid item xs={12}>
                {review.body}
            </Grid>
        </Grid>
    );
};

export default ReviewDescription;
