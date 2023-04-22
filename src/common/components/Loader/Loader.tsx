import React from 'react';
import { Box, Modal } from '@mui/material';
import { SpinnerDotted } from 'spinners-react';

const Loader = () => {
    return (
        <Modal open sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <SpinnerDotted size={50} thickness={120} speed={100} color="white" />
            </Box>
        </Modal>
    );
};

export default Loader;
