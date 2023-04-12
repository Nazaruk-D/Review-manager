import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CardsRow from './CardsRow/CardsRow';
import { TableRowType } from '../../../types/TableType';

const rows: TableRowType[] = [
    {
        id: '1',
        image: 'https://via.placeholder.com/100x100',
        name: 'Item 1',
        category: 'Movies',
        createdAt: '2022-10-10',
        rating: 4.2,
    },
    {
        id: '2',
        image: 'https://via.placeholder.com/100x100',
        name: 'Item 1',
        category: 'Movies',
        createdAt: '2022-10-10',
        rating: 4.2,
    },
    {
        id: '3',
        image: 'https://via.placeholder.com/100x100',
        name: 'Item 1',
        category: 'Movies',
        createdAt: '2022-10-10',
        rating: 4.2,
    },
    {
        id: '4',
        image: 'https://via.placeholder.com/100x100',
        name: 'Item 1',
        category: 'Movies',
        createdAt: '2022-10-10',
        rating: 4.2,
    },
];

const CardsTable = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>{t('image')}</TableCell>
                        <TableCell>{t('nameCard')}</TableCell>
                        <TableCell>{t('category')}</TableCell>
                        <TableCell>{t('createdCard')}</TableCell>
                        <TableCell>{t('rating')}</TableCell>
                        <TableCell>{t('settings')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <CardsRow row={row} key={row.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CardsTable;
