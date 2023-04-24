import React, { FC, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { selectorError } from '../../../store/selectors/appSelector';

const ErrorSnackbar = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectorError);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null));
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
