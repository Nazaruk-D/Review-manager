import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const StyledCard = styled(Card)({
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    },
    '&:active': {
        transform: 'scale(0.9)',
        boxShadow: 'none',
    },
    '&:hover .MuiButton-root': {
        backgroundColor: '#fff',
        color: '#000',
    },
    cursor: 'pointer',
});

type PosterPropsType = {
    creator: string;
    createdDate: string;
};

const PosterItem: FC<PosterPropsType> = ({ creator, createdDate }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'poster' });
    return (
        <Grid item xs={12} md={4}>
            <StyledCard>
                <Card>
                    <CardMedia
                        sx={{ height: 240 }}
                        image="https://www.everythingreptiles.com/wp-content/uploads/2020/05/Green-Iguana-Portrait.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h2" component="h3" color="text.secondary">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('category')}: Movie
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ px: 0, py: 1 }}>
                            {t('assessment')}: 7
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ px: 2, py: 0 }}>
                        <Rating name="poster-rating" defaultValue={3} size="small" />
                    </CardContent>
                    <CardContent sx={{ px: 2, py: 0 }}>
                        <Typography variant="caption" color="text.secondary">
                            {t('reviewed')}{' '}
                            <Typography variant="subtitle2" component="span" color="text.secondary">
                                {creator}
                            </Typography>
                            , {createdDate}
                        </Typography>
                    </CardContent>
                </Card>
            </StyledCard>
        </Grid>
    );
};

export default PosterItem;
