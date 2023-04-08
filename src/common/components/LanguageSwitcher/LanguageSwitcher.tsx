import React, { ChangeEvent, useCallback } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { checked } = event.target;
            if (checked) {
                i18n.changeLanguage('en');
            } else {
                i18n.changeLanguage('ru');
            }
        },
        [i18n],
    );

    const isEnglish = i18n.language === 'en';
    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={isEnglish} onChange={handleLanguageChange} />}
                label={isEnglish ? 'EN' : 'RUS'}
            />
        </FormGroup>
    );
};

export default LanguageSwitcher;
