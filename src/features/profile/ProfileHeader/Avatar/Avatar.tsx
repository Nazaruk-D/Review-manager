import React, { FC, useRef, useState } from 'react';
import { TFunction } from 'i18next';
import { Box, Button, Grid } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import s from './Avatar.module.scss';
import { UserType } from '../../../../types/UserType';
import { handleFileInputChange } from '../../../../utils/handleFileInputChange';
import { useUploadPhotoMutation } from '../../../../store/api/userAPISlice';

type AvatarPropsType = {
    t: TFunction;
    user: UserType;
};

const Avatar: FC<AvatarPropsType> = ({ user, t }) => {
    const [isVisible, setIsVisible] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [updatePhoto, { isLoading, isError, isSuccess }] = useUploadPhotoMutation();

    const handleButtonClick = () => {
        inputFileRef.current?.click();
    };
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const isValidFile = handleFileInputChange(file);
            if (isValidFile) {
                setPhoto(file);
            }
        }
    };
    const { getRootProps, getInputProps } = useDropzone({
        //accept: acceptedImageTypes,
        multiple: false,
        onDrop: (acceptedFiles) => {
            setPhoto(acceptedFiles[0]);
        },
    });
    return (
        <Grid
            item
            xs={12}
            md={2.2}
            className={s.avaBlock}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <img
                src={
                    user?.main_photo ||
                    'https://img.freepik.com/premium-vector/male-avatar-icon-unknown-or-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-on-white-background-vector-illustration_735449-120.jpg'
                }
                alt="test"
                className={s.image}
            />
            {isVisible && (
                <Box className={s.uploadPhoto}>
                    <input type="file" ref={inputFileRef} onChange={handleFileSelect} hidden />
                    <Button variant="contained" sx={{ fontSize: '10px', width: '80%' }} onClick={handleButtonClick}>
                        {t('upload photo')}
                    </Button>
                </Box>
            )}
        </Grid>
    );
};

export default Avatar;
