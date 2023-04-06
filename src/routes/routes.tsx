import React from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { Path } from '../enums/path';
import MainPage from '../features/mainPage/MainPage';
import Login from '../features/auth/login/Login';
import Registration from '../features/auth/registration/Registration';
import Root from '../app/Root/Root';

const routes = createRoutesFromElements(
    <Route path={Path.Root} element={<Root />}>
        <Route index element={<MainPage />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Registration />} />
    </Route>,
);

export default routes;
