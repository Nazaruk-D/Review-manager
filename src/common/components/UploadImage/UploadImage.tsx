import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import s from './UploadImage.module.scss';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';

type UploadImagePropsType = {
    image: File | null;
    setImage: (image: File | null) => void;
};

const UploadImage: FC<UploadImagePropsType> = ({ setImage, image }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'image' });

    const handleProfilePhotoDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file.size > 2 * 1024 * 1024) {
            dispatch(setAppErrorAC(t('file size')));
        } else if (!/^image\//.test(file.type)) {
            dispatch(setAppErrorAC(t('only image')));
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
                    {t('drag and drop')}
                </Typography>
            )}
        </Box>
    );
};

export default UploadImage;