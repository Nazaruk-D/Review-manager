import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './Introduction.module.scss';

const Introduction = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'introduction' });

    return (
        <div className={s.introductionContainer}>
            <h1 className={s.title}>{t('title')}</h1>
            <div className={s.description}>{t('description')}</div>
        </div>
    );
};

export default Introduction;
