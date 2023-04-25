import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../../../enums/path';
import s from './ReviewTags.module.scss';

type ReviewTagsPropsType = {
    tags: string[] | undefined;
};

const ReviewTags: FC<ReviewTagsPropsType> = ({ tags }) => {
    return (
        <Grid item xs={12} className={s.tagsBlock}>
            {tags!.length > 0 && (
                <>
                    {tags!.map((tag) => (
                        <NavLink key={tag} to={Path.Root} className={s.tag}>
                            #{tag}
                        </NavLink>
                    ))}
                </>
            )}
        </Grid>
    );
};

export default ReviewTags;
