import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDropzone } from 'react-dropzone';
import s from './EditProfiile.module.scss';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectorUserId, selectorUserName } from '../../../../store/selectors/userSelector';
import { useUpdateInfoMutation } from '../../../../store/api/userAPISlice';
import UploadImage from '../../../../common/components/UploadImage/UploadImage';

const EditProfile = () => {
    const userName = useAppSelector(selectorUserName);
    const userId = useAppSelector(selectorUserId);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [newName, setNewName] = useState<string>(userName || '');
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [uploadInfo] = useUpdateInfoMutation();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleProfilePhotoDrop = (acceptedFiles: File[]) => {
        console.log('acceptedFiles: ', acceptedFiles);
        const file = acceptedFiles[0];
        if (file.size > 2 * 1024 * 1024) {
            alert('The file size should not exceed 2MB');
        } else if (!/^image\//.test(file.type)) {
            alert('Only image files are allowed');
        } else {
            setProfilePhoto(file);
        }
    };

    const handleSaveChanges = () => {
        if (userId) {
            if (newName !== userName) {
                uploadInfo({ userId, newName, image });
            } else {
                uploadInfo({ userId, image });
            }
            setProfilePhoto(null);
            handleClose();
        }
    };

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
                        Edit profile
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Enter new username"
                                variant="outlined"
                                value={newName}
                                sx={{ mt: 1 }}
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage image={image} setImage={setImage} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSaveChanges}>
                                Save changes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
};

export default EditProfile;
