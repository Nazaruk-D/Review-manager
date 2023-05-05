import React, { FC } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { TFunction } from 'i18next';
import { FormikValues } from 'formik';

type AssessmentControlPropsType = {
    t: TFunction;
    themeColor: string;
    formik: FormikValues;
};

const AssessmentControl: FC<AssessmentControlPropsType> = ({ t, formik, themeColor }) => {
    const styleRadio = themeColor === 'dark' ? { color: '#white', '&.Mui-checked': { color: '#505050' } } : {};
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{t('rating')}</FormLabel>
            <RadioGroup
                row
                aria-label="assessment"
                name="assessment"
                value={formik.values.assessment}
                onChange={formik.handleChange}
            >
                {Array.from({ length: 10 }, (_, index) => (
                    <FormControlLabel
                        key={index}
                        value={(index + 1).toString()}
                        control={<Radio sx={styleRadio} />}
                        label={(index + 1).toString()}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default AssessmentControl;
