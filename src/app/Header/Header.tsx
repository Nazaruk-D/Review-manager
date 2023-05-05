import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../common/components/Logo/Logo';
import LanguageSwitcher from '../../common/components/LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../../common/components/ThemeSwitcher/ThemeSwitcher';
import AuthButtonsBlock from '../../common/components/AuthButtonsBlock/AuthButtonsBlock';
import SearchReview from '../../common/components/SearchReview/SearchReview';
import { setSearch } from '../../store/slices/reviewSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { Path } from '../../enums/path';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSearchQuery = (value: string) => {
        dispatch(setSearch(value));
        navigate(Path.Result);
    };

    return (
        <AppBar position="static" component="header">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Logo />
                        <SearchReview searchReview={onSearchQuery} />
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
