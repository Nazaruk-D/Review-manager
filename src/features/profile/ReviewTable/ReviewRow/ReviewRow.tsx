import React, { FC } from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import s from './ReviewRow.module.scss';
import noImage from '../../../../common/png/no_image.png';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';

type CardsRowPropsType = {
    row: ReviewResponseType;
    index: number;
};

const ReviewRow: FC<CardsRowPropsType> = ({ row, index }) => {
    const navigate = useNavigate();
    console.log(row.image);
    console.log(typeof noImage);
    return (
        <TableRow className={s.row} onClick={() => navigate(`/review/${row.id}`, { state: row })}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <img src={row.image ? row.image : noImage} alt={row.title} className={s.image} />
            </TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{dateFormat(row.created_at, 'mm/dd/yyyy')}</TableCell>
            <TableCell>{row.rating}</TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <IconButton>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default ReviewRow;
