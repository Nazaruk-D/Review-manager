import React from 'react';
import { Grid } from '@mui/material';
import PosterItem from './PosterItem/PosterItem';

const data = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'];

const Posters = () => {
    return (
        <Grid container spacing={2}>
            {data.map((d) => (
                <PosterItem key={d} createdDate="20.10.2020" creator="Dmitry Nazaruk" />
            ))}
        </Grid>
    );
};

export default Posters;
