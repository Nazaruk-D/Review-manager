import React, { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../../types/UserType';
import AdminTableRow from './AdminTableRow/AdminTableRow';

type AdminTablePropsType = {
    users: UserType[];
};

const AdminTable: FC<AdminTablePropsType> = ({ users }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

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
                        <AdminTableRow key={user.id} user={user} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminTable;
