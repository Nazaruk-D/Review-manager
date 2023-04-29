import React, { FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { selectorThemeApp } from '../../../../../store/selectors/appSelector';

type ReviewTextPropsType = {
    body: string;
};

const ReviewText: FC<ReviewTextPropsType> = ({ body }) => {
    const color = useAppSelector(selectorThemeApp);
    return (
        <Box data-color-mode={color}>
            <MDEditor.Markdown source={body} style={{ backgroundColor: 'inherit' }} />
        </Box>
    );
};

export default ReviewText;
