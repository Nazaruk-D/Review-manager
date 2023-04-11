import React, { useContext } from 'react';
import { Box, IconButton } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import { ColorModeContext } from '../../../hooks/useThemeMode';

const ThemeSwitcher = () => {
    const { toggleColorMode, mode } = useContext(ColorModeContext);

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {mode === 'dark' ? (
                <IconButton color="inherit" onClick={toggleColorMode}>
                    <WbSunnyOutlinedIcon />
                </IconButton>
            ) : (
                <IconButton color="inherit" onClick={toggleColorMode}>
                    <ModeNightOutlinedIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default ThemeSwitcher;
