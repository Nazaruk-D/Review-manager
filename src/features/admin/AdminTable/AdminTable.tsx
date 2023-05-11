import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import AdminTableRow from './AdminTableRow/AdminTableRow';
import {
    useChangeAdminStatusMutation,
    useChangeIsBlockedStatusMutation,
    useDeleteUserMutation,
} from '../../../store/api/adminAPISlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setAppErrorAC, setAppInformMessage } from '../../../store/slices/appSlice';
import { Role } from '../../../enums/role';
import { UserType } from '../../../types/UserType';

type AdminTablePropsType = {
    users: UserType[];
};

const AdminTable: FC<AdminTablePropsType> = ({ users }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { t: tSnackbar } = useTranslation('translation', { keyPrefix: 'snackbar messages' });
    const [changeAdminStatus, { error: roleError, isSuccess: roleSuccess }] = useChangeAdminStatusMutation();
    const [changeIsBlockedStatus, { error: statusError, isSuccess: statusSuccess }] = useChangeIsBlockedStatusMutation();
    const [deleteUser, { error: deleteError, isLoading, isSuccess: deleteSuccess }] = useDeleteUserMutation();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const changeAdminStatusHandler = (userId: string, status: boolean) => {
        if (status && !roleError) {
            changeAdminStatus({ userId, role: Role.Admin });
            dispatch(setAppInformMessage(`${tSnackbar('change role')} ${Role.Admin}`));
        } else if (!status && !roleError) {
            changeAdminStatus({ userId, role: Role.User });
            dispatch(setAppInformMessage(`${tSnackbar('change role')} ${Role.User}`));
        }
    };

    const blockUserHandler = (userId: string, status: boolean) => {
        if (status && !statusError) {
            changeIsBlockedStatus({ userId, status });
            dispatch(setAppInformMessage(`${tSnackbar('blocked status')}`));
        } else if (!status && !statusError) {
            changeIsBlockedStatus({ userId, status });
            dispatch(setAppInformMessage(`${tSnackbar('active status')}`));
        }
    };

    const deleteUserHandler = (userId: string) => {
        deleteUser({ userId });
        if (!deleteError) {
            dispatch(setAppInformMessage(tSnackbar('delete user')));
        }
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        if (roleError) {
            dispatch(setAppErrorAC('Role change error'));
        }
        if (statusError) {
            dispatch(setAppErrorAC('Status change error'));
        }
        if (deleteError) {
            dispatch(setAppErrorAC('Delete user error'));
        }
    }, [roleError, statusError, deleteError]);

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
                            isSuccess={deleteSuccess}
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
