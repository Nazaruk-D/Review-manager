import React from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../enums/path';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorIsLogin, selectorUserData } from '../../../store/selectors/userSelector';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AuthButtonsBlock = () => {
    const userData = useAppSelector(selectorUserData);
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigateToLogin = () => {
        navigate(Path.Login);
    };

    return userData ? (
        <Box sx={{ flexGrow: 0 }} onClick={() => navigate(Path.Profile)}>
            <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://sun1.velcom-by-minsk.userapi.com/impg/AN-ikCmTp9yLRpLCkoACsL5dMQC9PfxIv9sX-g/zJ5bKUy8JMk.jpg?size=1080x1920&quality=95&sign=0da9f7871dde6f0032cc304b2cd2dec7&type=album"
                    />
                </IconButton>
            </Tooltip>
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
