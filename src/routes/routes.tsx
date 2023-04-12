import React from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { Path } from '../enums/path';
import MainPage from '../features/mainPage/MainPage';
import Login from '../features/auth/login/Login';
import Registration from '../features/auth/registration/Registration';
import Root from '../app/Root/Root';
import Card from '../features/card/Card';
import Profile from '../features/profile/Profile';

const routes = createRoutesFromElements(
    <Route path={Path.Root} element={<Root />}>
        <Route index element={<MainPage />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Registration />} />
        <Route path={Path.Card} element={<Card />} />
        <Route path={Path.Profile} element={<Profile />} />
    </Route>,
);

export default routes;
