import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import s from './UploadImage.module.scss';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import ImagePreview from '../ImagePreview/ImagePreview';

type UploadImagePropsType = {
    images: File[] | null;
    setImages: (images: File[]) => void;
    dbImages: string[] | string;
    multiple: boolean;
};

const UploadImage: FC<UploadImagePropsType> = ({ setImages, images, dbImages, multiple }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'image' });

    const handleProfilePhotoDrop = (acceptedFiles: File[]) => {
        console.log('acceptedFiles: ', acceptedFiles);
        console.log('images: ', images);
        console.log('dbImages: ', dbImages);
        const updatedImages = images ? [...images, ...acceptedFiles] : [...acceptedFiles];
        const overSizedImage = updatedImages.find((file) => file.size > 2 * 1024 * 1024);
        const nonImageFile = updatedImages.find((file) => !/^image\//.test(file.type));

        if (overSizedImage) {
            dispatch(setAppErrorAC(t('file size')));
        } else if (nonImageFile) {
            dispatch(setAppErrorAC(t('only image')));
        } else {
            console.log('updatedImages: ', updatedImages);
            setImages(updatedImages);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleProfilePhotoDrop,
        multiple,
    });

    const [localDbImage, setLocalDbImage] = useState<string[]>([]);

    useEffect(() => {
        if (dbImages[0] === '') {
            setLocalDbImage([]);
        } else if (typeof dbImages === 'string') {
            setLocalDbImage([dbImages]);
        } else {
            setLocalDbImage(dbImages);
        }
    }, [dbImages]);

    const isImage = images ? images.map((image) => URL.createObjectURL(image)) : localDbImage;
    return (
        <Box {...getRootProps()} className={s.profilePhotoContainer}>
            <input {...getInputProps()} className={s.photoBlock} />
            {isImage?.length || dbImages.length > 1 ? null : (
                <Typography variant="caption" component="span">
                    {t('drag and drop')}
                </Typography>
            )}
            {isImage.length > 0 && isImage?.map((image) => <ImagePreview key={image} image={image} />)}
        </Box>
    );
};

export default UploadImage;
