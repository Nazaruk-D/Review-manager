import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Language } from '../../../enums/language';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = useCallback(() => {
        const newLanguage = i18n.language === Language.RU ? Language.EN : Language.RU;
        i18n.changeLanguage(newLanguage);
    }, [i18n]);

    const isEnglish = i18n.language === Language.EN;

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch
                        checked={isEnglish}
                        onChange={handleLanguageChange}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                bgcolor: '#fff',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#fff',
                            },
                        }}
                    />
                }
                label={isEnglish ? 'EN' : 'RU'}
                sx={{
                    '& .MuiTypography-root': {
                        color: '#fff',
                        mr: 1,
                    },
                }}
            />
        </FormGroup>
    );
};

export default LanguageSwitcher;
