import React from 'react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { Facebook, GitHub, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                bgcolor: 'background.paper',
                textAlign: 'center',
                fontSize: '0.8rem',
            }}
        >
            <Container maxWidth="lg" sx={{ p: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton aria-label="github" color="primary" href="https://github.com/">
                        <GitHub />
                    </IconButton>
                    <IconButton aria-label="facebook" color="primary" href="https://www.facebook.com/">
                        <Facebook />
                    </IconButton>
                    <IconButton aria-label="instagram" color="primary" href="https://www.instagram.com/">
                        <Instagram />
                    </IconButton>
                    <IconButton aria-label="instagram" color="primary" href="https://www.instagram.com/">
                        <LinkedIn />
                    </IconButton>
                </Box>
                <Box sx={{ pb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Dmitry Nazaruk © 2023
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
