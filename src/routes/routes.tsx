import React from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { Path } from '../enums/path';
import MainPage from '../features/mainPage/MainPage';
import Login from '../features/auth/login/Login';
import Registration from '../features/auth/registration/Registration';
import Root from '../app/Root/Root';
import Profile from '../features/profile/Profile';
import Review from '../features/review/Review/Review';
import AdminPage from '../features/admin/AdminPage';
import EditReview from '../features/review/EditReview/EditReview';
import CreateReview from '../features/review/CreateReview/CreateReview';
import ResultPage from '../features/result/ResultPage';
import Page404 from '../common/components/Page404/Page404';
import PrivacyPolicy from '../common/components/PrivacyPolicy/PrivacyPolicy';

const routes = createRoutesFromElements(
    <Route path={Path.Root} element={<Root />}>
        <Route index element={<MainPage />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Registration />} />
        <Route path={Path.Review} element={<Review />} />
        <Route path={Path.Result} element={<ResultPage />} />
        <Route path={Path.Profile} element={<Profile />} />
        <Route path={Path.AdminPage} element={<AdminPage />} />
        <Route path={Path.CreateReview} element={<CreateReview />} />
        <Route path={Path.UpdateReview} element={<EditReview />} />
        <Route path={Path.PrivacyPolicy} element={<PrivacyPolicy />} />
        <Route path="*" element={<Page404 />} />,
    </Route>,
);

export default routes;
