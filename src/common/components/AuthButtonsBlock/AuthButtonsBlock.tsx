import React from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../enums/path';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { selectorUserData } from '../../../store/selectors/userSelector';
import { useLogoutMutation } from '../../../store/api/authAPI';
import { setLoggedOut } from '../../../store/slices/userSlice';

const AuthButtonsBlock = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector(selectorUserData);
    const [logout] = useLogoutMutation();
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigateToLogin = () => {
        navigate(Path.Login);
    };

    const openProfile = () => {
        navigate(Path.Profile);
        handleCloseUserMenu();
    };

    const LogoutHandler = async () => {
        await logout({});
        dispatch(setLoggedOut());
        handleCloseUserMenu();
    };

    return userData ? (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={openProfile}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={LogoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    ) : (
        <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" sx={{ p: 0 }} component="span" onClick={navigateToLogin}>
                {t('signIn')}
            </Button>
        </Box>
    );
};

export default AuthButtonsBlock;
