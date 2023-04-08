import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import Logo from '../../common/components/Logo/Logo';
import LanguageSwitcher from '../../common/components/LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../../common/components/ThemeSwitcher/ThemeSwitcher';
import AuthButtonsBlock from '../../common/components/AuthButtonsBlock/AuthButtonsBlock';

const Header = () => {
    return (
        <AppBar position="static" component="header">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo />
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                    <AuthButtonsBlock />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
