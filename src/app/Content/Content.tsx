import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../features/mainPage/MainPage';
import { Path } from '../../enums/path';
import Login from '../../features/auth/login/Login';
import Registration from '../../features/auth/registration/Registration';

const Content = () => {
    return (
        <Routes>
            <Route index path={Path.Root} element={<MainPage />} />
            <Route index path={Path.Login} element={<Login />} />
            <Route index path={Path.Register} element={<Registration />} />
        </Routes>
    );
};

export default Content;
