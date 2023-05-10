import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import s from './UploadImage.module.scss';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import ImagePreview from '../ImagePreview/ImagePreview';

type UploadImagePropsType = {
    images: File[] | null;
    setImages: (images: File[] | null) => void;
    dbImages: string[] | string;
    multiple: boolean;
};

const UploadImage: FC<UploadImagePropsType> = ({ setImages, images, dbImages, multiple }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'image' });

    const handleProfilePhotoDrop = (acceptedFiles: File[]) => {
        if (!multiple && images && images.length > 0) {
            dispatch(setAppErrorAC('Only one photo can be added'));
            return;
        }
        if (acceptedFiles.length > 3) {
            dispatch(setAppErrorAC("You can't attach more than 3 photos"));
            return;
        }
        const updatedImages = images ? [...images, ...acceptedFiles] : [...acceptedFiles];
        const overSizedImage = updatedImages.find((file) => file.size > 2 * 1024 * 1024);
        const nonImageFile = updatedImages.find((file) => !/^image\//.test(file.type));
        if (overSizedImage) {
            dispatch(setAppErrorAC(t('file size')));
        } else if (nonImageFile) {
            dispatch(setAppErrorAC(t('only image')));
        } else {
            setImages(updatedImages);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleProfilePhotoDrop,
        multiple,
    });

    const [localDbImage, setLocalDbImage] = useState<string[]>([]);

    const deleteImageHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setImages(null);
        setLocalDbImage([]);
    };

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
            {(isImage?.length > 0 && isImage[0] !== '') || (dbImages.length > 0 && dbImages[0] !== '') ? null : (
                <Typography variant="caption" component="span">
                    {t('drag and drop')}
                </Typography>
            )}
            {isImage.length > 0 && isImage[0] !== '' && isImage?.map((image) => <ImagePreview key={image} image={image} />)}
            <Box sx={{ position: 'absolute', right: '15px', top: '15px' }} onClick={deleteImageHandler}>
                <IconButton>
                    <DeleteOutlineIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default UploadImage;
