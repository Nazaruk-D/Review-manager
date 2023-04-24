import React from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { Path } from '../enums/path';
import MainPage from '../features/mainPage/MainPage';
import Login from '../features/auth/login/Login';
import Registration from '../features/auth/registration/Registration';
import Root from '../app/Root/Root';
import Profile from '../features/profile/Profile';
import Review from '../features/review/Review/Review';
import { ReviewForm } from '../features/review/ReviewForm/ReviewForm';
import AdminPage from '../features/admin/AdminPage';

const routes = createRoutesFromElements(
    <Route path={Path.Root} element={<Root />}>
        <Route index element={<MainPage />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Registration />} />
        <Route path={Path.Review} element={<Review />} />
        <Route path={Path.Profile} element={<Profile />} />
        <Route path={Path.AdminPage} element={<AdminPage />} />
        <Route path={Path.CreateReview} element={<ReviewForm />} />
    </Route>,
);

export default routes;
