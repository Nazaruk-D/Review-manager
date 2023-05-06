import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import s from './Root.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ErrorSnackbar from '../../common/components/ErrorSnackbar/ErrorSnackbar';
import { useAppSelector } from '../../hooks/useRedux';
import { isBlockedSelector } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';
import BlockedPage from '../../common/components/BlockedPage/BlockedPage';

const Root = () => {
    const isBlocked = useAppSelector(isBlockedSelector);
    return (
        <div className={s.rootContainer}>
            <Header />
            {isBlocked ? <BlockedPage /> : <Outlet />}
            <ErrorSnackbar />
            <Footer />
        </div>
    );
};

export default Root;
