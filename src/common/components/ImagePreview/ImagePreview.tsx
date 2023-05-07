import React, { FC } from 'react';
import { Box } from '@mui/material';
import s from './ImagePreview.module.scss';

type ImagePreviewPropsType = {
    image: string;
};

const ImagePreview: FC<ImagePreviewPropsType> = ({ image }) => {
    return (
        <Box sx={{ m: 1 }}>
            <img src={image} alt="Preview" className={s.image} />
        </Box>
    );
};

export default ImagePreview;
