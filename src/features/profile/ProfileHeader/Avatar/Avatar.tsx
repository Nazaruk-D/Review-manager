import React, { FC } from 'react';
import { Grid } from '@mui/material';
import s from './Avatar.module.scss';
import { UserType } from '../../../../types/UserType';

type AvatarPropsType = {
    user: UserType | undefined;
};

const Avatar: FC<AvatarPropsType> = ({ user }) => {
    return (
        <Grid item xs={12} md={2.2} className={s.avaBlock}>
            <img
                src={
                    user?.main_photo ||
                    'https://img.freepik.com/premium-vector/male-avatar-icon-unknown-or-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-on-white-background-vector-illustration_735449-120.jpg'
                }
                alt="test"
                className={s.image}
            />
        </Grid>
    );
};

export default Avatar;
