import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetPopularTagsQuery } from '../../../store/api/reviewAPISlice';
import Loader from '../../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import { Path } from '../../../enums/path';
import s from './TagCloud.module.scss';
import { setSearch } from '../../../store/slices/reviewSlice';

const TagCloudBox = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetPopularTagsQuery({});

    const onClickHandler = (tag: string) => {
        dispatch(setSearch(tag));
        navigate(Path.Result);
    };

    if (error) {
        dispatch(setAppErrorAC('Error getting reviews'));
    }
    const tags = data?.data || [];
    return (
        <Box>
            <Typography variant="h2" style={{ marginBottom: '15px' }}>
                Popular tags
            </Typography>
            {tags!.map((tag) => (
                <Box key={tag} className={s.tag} onClick={() => onClickHandler(tag)}>
                    #{tag}
                </Box>
            ))}
        </Box>
    );
};

export default TagCloudBox;
