import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import Logo from '../../common/components/Logo/Logo';
import LanguageSwitcher from '../../common/components/LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../../common/components/ThemeSwitcher/ThemeSwitcher';
import AuthButtonsBlock from '../../common/components/AuthButtonsBlock/AuthButtonsBlock';
import SearchReview from '../../common/components/SearchReview/Search';

const Header = () => {
    return (
        <AppBar position="static" component="header">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Logo />
                        <SearchReview />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                        <AuthButtonsBlock />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
