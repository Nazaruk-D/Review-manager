import { useTranslation } from 'react-i18next';
import { CategoryFilterType } from '../types/CategoryFilterType';

export function getCategoryTranslation(category: CategoryFilterType) {
    const { t } = useTranslation('translation', { keyPrefix: 'category' });
    switch (category) {
        case 'Movies':
            return t('Movies');
        case 'Books':
            return t('Books');
        case 'Games':
            return t('Games');
        case 'Food':
            return t('Food');
        case 'Cars':
            return t('Cars');
        case 'Sport':
            return t('Sport');
        case 'Other':
            return t('Other');
        case 'All':
            return t('All');
        default:
            return category;
    }
}
