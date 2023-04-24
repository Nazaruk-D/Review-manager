import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './Root.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ErrorSnackbar from '../../common/components/ErrorSnackbar/ErrorSnackbar';

const Root = () => {
    return (
        <div className={s.rootContainer}>
            <Header />
            <Outlet />
            <ErrorSnackbar />
            <Footer />
        </div>
    );
};

export default Root;
