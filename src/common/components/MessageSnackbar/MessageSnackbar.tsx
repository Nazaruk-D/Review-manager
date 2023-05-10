import React, { useEffect, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setAppErrorAC, setAppInformMessage } from '../../../store/slices/appSlice';
import { selectorError, selectorInformMessage } from '../../../store/selectors/appSelector';

const MessageSnackbar = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectorError);
    const informMessage = useAppSelector(selectorInformMessage);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('error');

    useEffect(() => {
        if (error) {
            setOpen(true);
            setSeverity('error');
            setMessage(error);
        }
        if (informMessage) {
            setOpen(true);
            setSeverity('info');
            setMessage(informMessage);
        }
    }, [error, informMessage]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null));
        dispatch(setAppInformMessage(null));
        setOpen(false);
        setMessage('');
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default MessageSnackbar;
