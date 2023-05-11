import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import s from './Root.module.scss';
import { useAppSelector } from '../../hooks/useRedux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageSnackbar from '../../common/components/MessageSnackbar/MessageSnackbar';
import BlockedPage from '../../common/components/BlockedPage/BlockedPage';
import { isBlockedSelector } from '../../store/selectors/userSelector';

const Root = () => {
    const isBlocked = useAppSelector(isBlockedSelector);
    return (
        <Box className={s.rootContainer}>
            <Header />
            {isBlocked ? <BlockedPage /> : <Outlet />}
            <MessageSnackbar />
            <Footer />
        </Box>
    );
};

export default Root;
