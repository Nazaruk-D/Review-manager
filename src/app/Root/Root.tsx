import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './Root.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageSnackbar from '../../common/components/MessageSnackbar/MessageSnackbar';
import { useAppSelector } from '../../hooks/useRedux';
import { isBlockedSelector } from '../../store/selectors/userSelector';
import BlockedPage from '../../common/components/BlockedPage/BlockedPage';

const Root = () => {
    const isBlocked = useAppSelector(isBlockedSelector);
    return (
        <div className={s.rootContainer}>
            <Header />
            {isBlocked ? <BlockedPage /> : <Outlet />}
            <MessageSnackbar />
            <Footer />
        </div>
    );
};

export default Root;
