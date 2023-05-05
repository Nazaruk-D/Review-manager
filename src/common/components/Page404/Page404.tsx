import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image404 from '../../png/404.png';
import { Path } from '../../../enums/path';

const Page404 = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate(Path.Root);
    };
    return (
        <Container sx={{ mt: '2rem' }}>
            <Box
                sx={{
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography gutterBottom variant="h5" component="h3" color="text.secondary">
                    Page not found
                </Typography>
                <img src={image404} alt="page not found" style={{ height: '70%' }} />
                <Button variant="contained" onClick={onClickHandler}>
                    Go to home page
                </Button>
            </Box>
        </Container>
    );
};

export default Page404;
