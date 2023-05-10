import React, { FC, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../../../enums/path';
import s from './EditProfiile.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useUpdateInfoMutation } from '../../../../store/api/userAPISlice';
import UploadImage from '../../../../common/components/UploadImage/UploadImage';
import { setAppErrorAC, setAppInformMessage } from '../../../../store/slices/appSlice';
import { userIdSelector, userNameSelector, userPhotoSelector } from '../../../../store/selectors/adminSelector';
import { buttonStyles } from '../../../../styles/common/buttonStyles';
import { selectorThemeApp } from '../../../../store/selectors/appSelector';
import { useDeleteUserMutation } from '../../../../store/api/adminAPISlice';
import { setLoggedOut, setUser } from '../../../../store/slices/userSlice';

type EditProfilePropsType = {
    t: TFunction;
};

const EditProfile: FC<EditProfilePropsType> = ({ t }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useAppSelector(userIdSelector);
    const userName = useAppSelector(userNameSelector);
    const adminPhoto = useAppSelector(userPhotoSelector);
    const themeColor = useAppSelector(selectorThemeApp);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File[] | null>(null);
    const [newName, setNewName] = useState<string>('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [uploadInfo, { error, isLoading }] = useUpdateInfoMutation();
    const [deleteUser, { error: deleteError, isLoading: deleteLoading, isSuccess }] = useDeleteUserMutation();
    const style = buttonStyles(themeColor);
    const { t: tSnackbar } = useTranslation('translation', { keyPrefix: 'snackbar messages' });

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleSaveChanges = () => {
        if (userId) {
            uploadInfo({ userId, newName, image });
        }
        if (!error) {
            dispatch(setAppInformMessage(tSnackbar('edit profile')));
            setOpen(false);
        }
    };

    const deleteProfileHandler = () => {
        if (userId) {
            deleteUser({ userId });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setLoggedOut());
            setShowDeleteConfirmation(false);
            navigate(Path.Root);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (userName) {
            setNewName(userName);
        }
    }, [userName]);

    useEffect(() => {
        if (error) {
            dispatch(setAppErrorAC(t('error update')));
        } else {
            setProfilePhoto(null);
            handleClose();
        }
    }, [error, dispatch]);

    return (
        <Grid className={s.editProfileContainer}>
            <Box className={s.settingsBlock} onClick={handleOpen}>
                <IconButton>
                    <MoreHorizIcon fontSize="large" />
                </IconButton>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: 'background.paper' }} className={s.modalBlock}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {t('edit profile')}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t('new name')}
                                variant="outlined"
                                value={newName}
                                sx={{ mt: 1 }}
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage images={image} setImages={setImage} dbImages={adminPhoto || ''} multiple={false} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSaveChanges} sx={style}>
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : t('save changes')}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {!showDeleteConfirmation ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={() => setShowDeleteConfirmation(true)}
                                >
                                    {t('delete profile')}
                                </Button>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ width: '49%' }}
                                        onClick={deleteProfileHandler}
                                    >
                                        {deleteLoading ? <CircularProgress size={24} color="inherit" /> : t('confirm')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ width: '49%' }}
                                        onClick={() => setShowDeleteConfirmation(false)}
                                    >
                                        {t('cancel')}
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
};

export default EditProfile;
