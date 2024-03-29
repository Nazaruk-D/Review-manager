import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setSearch } from '../../../../../store/slices/reviewSlice';
import { useAppDispatch } from '../../../../../hooks/useRedux';
import { Path } from '../../../../../enums/path';
import s from './ReviewTags.module.scss';

type ReviewTagsPropsType = {
    tags: string[] | undefined;
};

const ReviewTags: FC<ReviewTagsPropsType> = ({ tags }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onClickHandler = (tag: string) => {
        dispatch(setSearch(tag));
        navigate(`/${Path.Result}`);
    };
    return (
        <Grid item xs={12} className={s.tagsBlock} sx={{}}>
            {tags!.length > 0 && (
                <>
                    {tags!.map((tag) => (
                        <Box key={tag} className={s.tag} onClick={() => onClickHandler(tag)}>
                            #{tag}
                        </Box>
                    ))}
                </>
            )}
        </Grid>
    );
};

export default ReviewTags;
