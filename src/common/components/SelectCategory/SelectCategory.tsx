import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FormikValues } from 'formik';
import { CATEGORIES } from '../../constants/constants';
import { Category } from '../../../enums/category';

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
                {CATEGORIES.filter((category) => category !== Category.All).map((category: string) => (
                    <MenuItem key={category} value={category}>
                        {tc(category)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCategory;
