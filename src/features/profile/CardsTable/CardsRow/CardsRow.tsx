import React, { FC } from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import s from './CardsRow.module.scss';
import { TableRowType } from '../../../../types/TableType';

type CardsRowPropsType = {
    row: TableRowType;
};

const CardsRow: FC<CardsRowPropsType> = ({ row }) => {
    return (
        <TableRow key={row.id} className={s.row}>
            <TableCell>{row.id}</TableCell>
            <TableCell>
                <img src={row.image} alt={row.name} />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.createdAt}</TableCell>
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

export default CardsRow;
