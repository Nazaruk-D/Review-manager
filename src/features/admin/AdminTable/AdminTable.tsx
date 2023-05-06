import React, { FC, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../../types/UserType';
import AdminTableRow from './AdminTableRow/AdminTableRow';
import { useChangeAdminStatusMutation, useChangeIsBlockedStatusMutation } from '../../../store/api/adminAPISlice';
import { Role } from '../../../enums/role';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setAppErrorAC } from '../../../store/slices/appSlice';

type AdminTablePropsType = {
    users: UserType[];
};

const AdminTable: FC<AdminTablePropsType> = ({ users }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const [changeAdminStatus, { error: RoleErr }] = useChangeAdminStatusMutation();
    const [changeIsBlockedStatus, { error: statusErr }] = useChangeIsBlockedStatusMutation();

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

    const deleteUserHandler = (id: string) => {
        console.log(id);
    };

    useEffect(() => {
        if (RoleErr) {
            dispatch(setAppErrorAC('Role change error'));
        }
        if (statusErr) {
            dispatch(setAppErrorAC('Status change error'));
        }
    }, [RoleErr, statusErr]);

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
                    {users.map((user, index) => (
                        <AdminTableRow
                            key={user.id}
                            user={user}
                            index={index}
                            blockUser={blockUserHandler}
                            changeAdminStatus={changeAdminStatusHandler}
                            deleteUser={deleteUserHandler}
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
        </TableContainer>
    );
};

export default AdminTable;
