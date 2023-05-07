import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormikValues } from 'formik';
import { CATEGORIES } from '../../constants/constants';

type SelectCategoryPropsType = {
    formik: FormikValues;
};

const SelectCategory: FC<SelectCategoryPropsType> = ({ formik }) => {
    const { t: tc } = useTranslation('translation', { keyPrefix: 'category' });
    const { t } = useTranslation('translation', { keyPrefix: 'review editor' });

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('category')}</InputLabel>
            <Select labelId="demo-simple-select-label" {...formik.getFieldProps('category')}>
                {CATEGORIES.map((category: string) => (
                    <MenuItem key={category} value={category}>
                        {tc(category)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCategory;