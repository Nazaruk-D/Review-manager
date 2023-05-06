import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const BlockedPage = () => {
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
                    Your account is blocked
                </Typography>
            </Box>
        </Container>
    );
};

export default BlockedPage;
