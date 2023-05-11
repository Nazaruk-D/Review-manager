import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, Switch, TableCell, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import DeleteTableCell from '../../../../common/components/DelteTableCell/DeleteTableCell';
import { UserType } from '../../../../types/UserType';
import s from './AdminTableRow.module.scss';
import { Role } from '../../../../enums/role';
import avatar from '../../../../common/png/avatar.png';

type AdminTableRowPropsType = {
    user: UserType;
    index: number;
    blockUser: (id: string, status: boolean) => void;
    changeAdminStatus: (id: string, status: boolean) => void;
    deleteUser: (id: string) => void;
    isLoading: boolean;
    isSuccess: boolean;
};

const AdminTableRow: FC<AdminTableRowPropsType> = ({
    user,
    index,
    blockUser,
    changeAdminStatus,
    deleteUser,
    isLoading,
    isSuccess,
}) => {
    const navigate = useNavigate();
    const [isUser, setIsUser] = useState(user.role === 'user');
    const [isBlocked, setIsBlocked] = useState(user.is_blocked);

    const changeAdminStatusHandler = () => {
        setIsUser(!isUser);
        changeAdminStatus(user.id, isUser);
    };

    const blockUserHandler = () => {
        setIsBlocked(!isBlocked);
        blockUser(user.id, !isBlocked);
    };

    const deleteUserHandler = () => {
        deleteUser(user.id);
    };

    const onEditProfileHandler = () => {
        navigate(`/update-review/${user.id}`);
    };

    return (
        <TableRow key={user.id} className={s.row} onClick={() => navigate(`/profile/${user.id}`)}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <img src={user.small_photo || avatar} alt="user" className={s.image} />
            </TableCell>
            <TableCell>{user.user_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
                <FormControlLabel
                    control={<Switch checked={!isUser} onChange={changeAdminStatusHandler} />}
                    label={isUser ? Role.User : Role.Admin}
                />
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
                <FormControlLabel
                    control={<Switch checked={isBlocked} onChange={blockUserHandler} />}
                    label={isBlocked ? 'blocked' : 'active'}
                />
            </TableCell>
            <TableCell>{dateFormat(user.created_at, 'mmmm dS, yyyy, h:MM:ss TT')}</TableCell>
            <DeleteTableCell
                isLoading={isLoading}
                isSuccess={isSuccess}
                deleteHandler={deleteUserHandler}
                editHandler={onEditProfileHandler}
                editIcon={false}
            />
        </TableRow>
    );
};

export default AdminTableRow;
