import React, { FC } from 'react';
import { Grid } from '@mui/material';
import s from './Avatar.module.scss';
import { UserType } from '../../../../types/UserType';
import avatar from '../../../../common/png/avatar.png';

type AvatarPropsType = {
    user: UserType | undefined;
};

const Avatar: FC<AvatarPropsType> = ({ user }) => {
    return (
        <Grid item xs={12} md={2.2} className={s.avaBlock}>
            <img src={user?.main_photo || avatar} alt="test" className={s.image} />
        </Grid>
    );
};

export default Avatar;
