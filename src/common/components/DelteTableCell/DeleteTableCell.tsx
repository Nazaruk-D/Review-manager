import React, { FC, useState } from 'react';
import { Box, CircularProgress, IconButton, TableCell, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

type DeleteTableCellPropsType = {
    deleteHandler: () => void;
    editHandler: () => void;
    isSuccess: boolean;
    isLoading: boolean;
    editIcon: boolean;
};

const DeleteTableCell: FC<DeleteTableCellPropsType> = ({ isSuccess, isLoading, deleteHandler, editHandler, editIcon }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'action' });

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setShowDeleteConfirmation(true);
    };

    const deleteUserHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteHandler();
        if (isSuccess) {
            setShowDeleteConfirmation(false);
        }
    };

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        editHandler();
    };

    const onCancelDeleteReviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowDeleteConfirmation(false);
    };
    return (
        <TableCell sx={{ width: '120px' }}>
            {!showDeleteConfirmation ? (
                <>
                    {editIcon && (
                        <IconButton onClick={onEditReviewHandler}>
                            <EditOutlinedIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={onClickHandler}>
                        <DeleteForeverIcon color="inherit" />
                    </IconButton>
                </>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        <>
                            <Typography variant="body2">{t('confirm')}</Typography>
                            <Box>
                                <IconButton onClick={deleteUserHandler} disabled={isLoading}>
                                    <CheckIcon fontSize="medium" />
                                </IconButton>
                                <IconButton onClick={onCancelDeleteReviewHandler} disabled={isLoading}>
                                    <CloseIcon fontSize="medium" />
                                </IconButton>
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </TableCell>
    );
};

export default DeleteTableCell;
