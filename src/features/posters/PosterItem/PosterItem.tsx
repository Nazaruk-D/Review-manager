import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

type PosterPropsType = {
    key: string;
};

const PosterItem: FC<PosterPropsType> = ({ key }) => {
    return (
        <Grid item xs={12} md={4} key={key}>
            <Card>
                <CardMedia
                    sx={{ height: 240 }}
                    image="https://www.everythingreptiles.com/wp-content/uploads/2020/05/Green-Iguana-Portrait.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                        Lizard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Open</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PosterItem;
