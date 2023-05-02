import React, { FC, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TFunction } from 'i18next';
import s from './EditProfiile.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useUpdateInfoMutation } from '../../../../store/api/userAPISlice';
import UploadImage from '../../../../common/components/UploadImage/UploadImage';
import { setAppErrorAC } from '../../../../store/slices/appSlice';
import { userIdSelector, userNameSelector, userPhotoSelector } from '../../../../store/selectors/adminSelector';

type EditProfilePropsType = {
    t: TFunction;
};

const EditProfile: FC<EditProfilePropsType> = ({ t }) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(userIdSelector);
    const userName = useAppSelector(userNameSelector);
    const adminPhoto = useAppSelector(userPhotoSelector);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [newName, setNewName] = useState<string>('');
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [uploadInfo, { error, isLoading }] = useUpdateInfoMutation();

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
        if (userId && !error) {
            uploadInfo({ userId, newName, image });
            setOpen(false);
        }
    };

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
                            <UploadImage image={image} setImage={setImage} dbImage={adminPhoto || ''} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSaveChanges}>
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : t('save changes')}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
};

export default EditProfile;
