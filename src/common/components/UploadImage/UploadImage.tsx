import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import s from './UploadImage.module.scss';

type UploadImagePropsType = {
    image: File | null;
    setImage: (image: File | null) => void;
};

const UploadImage: FC<UploadImagePropsType> = ({ setImage, image }) => {
    const handleProfilePhotoDrop = (acceptedFiles: File[]) => {
        console.log('acceptedFiles: ', acceptedFiles);
        const file = acceptedFiles[0];
        if (file.size > 2 * 1024 * 1024) {
            alert('The file size should not exceed 2MB');
        } else if (!/^image\//.test(file.type)) {
            alert('Only image files are allowed');
        } else {
            setImage(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleProfilePhotoDrop,
        multiple: false,
    });
    return (
        <Box
            {...getRootProps()}
            className={s.profilePhotoContainer}
            style={{ backgroundImage: `url(${image ? URL.createObjectURL(image) : ''})` }}
        >
            <input {...getInputProps()} className={s.photoBlock} />
            {image ? null : (
                <Typography variant="caption" component="span">
                    Drag and drop a photo here or click to select
                </Typography>
            )}
        </Box>
    );
};

export default UploadImage;
