import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useGetPopularTagsQuery } from '../../../store/api/reviewAPI';
import Loader from '../../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import { Path } from '../../../enums/path';
import s from './TagCloud.module.scss';

const TagCloudBox = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetPopularTagsQuery({});
    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        dispatch(setAppErrorAC('Error getting reviews'));
    }
    const tags = data!.data;
    return (
        <Box>
            <Typography variant="h2" style={{ marginBottom: '15px' }}>
                Popular tags
            </Typography>
            {tags!.map((tag) => (
                <NavLink key={tag} to={Path.Root} className={s.tag}>
                    #{tag}
                </NavLink>
            ))}
        </Box>
    );
};

export default TagCloudBox;
