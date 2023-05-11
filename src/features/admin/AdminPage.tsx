import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/useRedux';
import { selectorIsLogin, selectorRole } from '../../store/selectors/userSelector';
import AdminTable from './AdminTable/AdminTable';
import Loader from '../../common/components/Loader/Loader';
import { useGetUsersQuery } from '../../store/api/adminAPISlice';
import { Path } from '../../enums/path';
import { Role } from '../../enums/role';
import { UserType } from '../../types/UserType';

const AdminPage = () => {
    const isLogin = useAppSelector(selectorIsLogin);
    const role = useAppSelector(selectorRole);
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetUsersQuery();
    const users: UserType[] = data ? data.data : [];

    useEffect(() => {
        if (!isLogin) navigate(Path.Root);
    }, [isLogin]);

    useEffect(() => {
        if (role !== Role.Admin) navigate(Path.Root);
    }, [role]);

    if (error) {
        console.log(error);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <AdminTable users={users} />
        </Container>
    );
};

export default AdminPage;
