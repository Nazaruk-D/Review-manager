import React from 'react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { Facebook, GitHub, Instagram, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../enums/path';

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'footer' });
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                textAlign: 'center',
                fontSize: '0.8rem',
                marginTop: 'auto',
                width: '100%',
            }}
            onClick={() => navigate(`${Path.Review}/`)}
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
                        {t('copyright')}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
