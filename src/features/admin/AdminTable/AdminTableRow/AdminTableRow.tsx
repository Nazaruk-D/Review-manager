import React, { FC, useState } from 'react';
import { TableCell, TableRow, Switch, FormControlLabel, IconButton } from '@mui/material';
import dateFormat from 'dateformat';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { UserType } from '../../../../types/UserType';
import s from './AdminTableRow.module.scss';

type AdminTableRowPropsType = {
    user: UserType;
    index: number;
};

const AdminTableRow: FC<AdminTableRowPropsType> = ({ user, index }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isUser, setIsUser] = useState(user.role === 'user');
    const [isBlocked, setIsBlocked] = useState(user.is_blocked);

    const handleUserRoleChange = () => {
        setIsUser(!isUser);
        console.log('ROLE CHANGES');
    };

    const handleIsBlockedChange = () => {
        setIsBlocked(!isBlocked);
        console.log('ISBLOCKED CHANGES');
    };

    const handleDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log('DELETE');
    };

    return (
        <TableRow key={user.id} className={s.row} onClick={() => navigate(`/profile/${user.id}`)}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <img src={user.small_photo} alt="user" className={s.image} />
            </TableCell>
            <TableCell>{user.user_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
                <FormControlLabel
                    control={<Switch checked={isUser} onChange={handleUserRoleChange} />}
                    label={isUser ? 'user' : 'admin'}
                />
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
                <FormControlLabel
                    control={<Switch checked={isBlocked} onChange={handleIsBlockedChange} />}
                    label={isBlocked ? 'blocked' : 'active'}
                />
            </TableCell>
            <TableCell>{dateFormat(user.created_at, 'mmmm dS, yyyy, h:MM:ss TT')}</TableCell>
            <TableCell>
                <IconButton onClick={handleDeleteButtonClick}>
                    <DeleteForeverIcon color="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default AdminTableRow;
