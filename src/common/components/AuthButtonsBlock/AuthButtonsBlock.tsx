import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setLoggedOut } from '../../../store/slices/userSlice';
import { supabase } from '../../../utils/supabase';
import { selectorUserData } from '../../../store/selectors/userSelector';
import { Role } from '../../../enums/role';
import { Path } from '../../../enums/path';
import avatar from '../../png/avatar.png';

const AuthButtonsBlock = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector(selectorUserData);
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

    const profilePage = () => {
        navigate(`/profile/${userData!.id}`);
        handleCloseUserMenu();
    };

    const LogoutHandler = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
            return;
        }
        dispatch(setLoggedOut());
        handleCloseUserMenu();
    };

    const homePage = () => {
        navigate(Path.Root);
        handleCloseUserMenu();
    };

    const adminPage = () => {
        navigate(Path.AdminPage);
        handleCloseUserMenu();
    };

    return userData ? (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        sx={{ width: '50px', height: '50px', border: '2px solid white' }}
                        src={userData.small_photo || avatar}
                    />
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
                <MenuItem onClick={homePage}>
                    <Typography textAlign="center">{t('home')}</Typography>
                </MenuItem>
                <MenuItem onClick={profilePage}>
                    <Typography textAlign="center">{t('profile')}</Typography>
                </MenuItem>
                {userData.role === Role.Admin && (
                    <MenuItem onClick={adminPage}>
                        <Typography textAlign="center">{t('admin')}</Typography>
                    </MenuItem>
                )}
                <MenuItem onClick={LogoutHandler}>
                    <Typography textAlign="center">{t('logout')}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" sx={{ p: 0 }} component="span" onClick={navigateToLogin}>
                {t('signIn')}
            </Button>
        </Box>
    );
};

export default AuthButtonsBlock;
