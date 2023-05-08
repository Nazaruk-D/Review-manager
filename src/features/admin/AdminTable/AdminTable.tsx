import React, { FC, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@mui/lab';
import { UserType } from '../../../types/UserType';
import AdminTableRow from './AdminTableRow/AdminTableRow';
import {
    useChangeAdminStatusMutation,
    useChangeIsBlockedStatusMutation,
    useDeleteUserMutation,
} from '../../../store/api/adminAPISlice';
import { Role } from '../../../enums/role';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setAppErrorAC } from '../../../store/slices/appSlice';

type AdminTablePropsType = {
    users: UserType[];
};

const AdminTable: FC<AdminTablePropsType> = ({ users }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const [changeAdminStatus, { error: RoleError }] = useChangeAdminStatusMutation();
    const [changeIsBlockedStatus, { error: statusError }] = useChangeIsBlockedStatusMutation();
    const [deleteUser, { error: deleteError, isLoading, isSuccess }] = useDeleteUserMutation();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const changeAdminStatusHandler = (userId: string, status: boolean) => {
        console.log(userId, status);
        if (status) {
            changeAdminStatus({ userId, role: Role.Admin });
        } else {
            changeAdminStatus({ userId, role: Role.User });
        }
    };

    const blockUserHandler = (userId: string, status: boolean) => {
        changeIsBlockedStatus({ userId, status });
    };

    const deleteUserHandler = (userId: string) => {
        deleteUser({ userId });
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        if (RoleError) {
            dispatch(setAppErrorAC('Role change error'));
        }
        if (statusError) {
            dispatch(setAppErrorAC('Status change error'));
        }
        if (deleteError) {
            dispatch(setAppErrorAC('Delete user error'));
        }
    }, [RoleError, statusError, deleteError]);

    return (
        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>{t('image')}</TableCell>
                        <TableCell>{t('name')}</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>{t('role')}</TableCell>
                        <TableCell>{t('blocked')}</TableCell>
                        <TableCell>{t('created')}</TableCell>
                        <TableCell>{t('settings')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentUsers.map((user, index) => (
                        <AdminTableRow
                            key={user.id}
                            user={user}
                            index={startIndex + index}
                            blockUser={blockUserHandler}
                            changeAdminStatus={changeAdminStatusHandler}
                            deleteUser={deleteUserHandler}
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                        />
                    ))}
                    {users.length === 0 && (
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', height: '100px' }} colSpan={9}>
                                <Typography variant="h3"> {t('no users found')}</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                count={Math.ceil(users.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                color="standard"
                size="large"
                sx={{ mt: 1, mb: 1 }}
            />
        </TableContainer>
    );
};

export default AdminTable;
