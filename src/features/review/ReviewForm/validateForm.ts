import { TFunction } from 'i18next';
import { FormikValues } from 'formik';
import { ReviewErrorType } from '../../../types/FormikErrorTypes';

export const validateForm = (values: FormikValues, t: TFunction) => {
    const errors: ReviewErrorType = {};
    if (!values.review_title) {
        errors.review_title = `${t('review title')}`;
    }
    if (!values.title) {
        errors.title = `${t('title')}`;
    }
    if (!values.category) {
        errors.category = `${t('category')}`;
    }
    if (!values.body) {
        errors.body = `${t('body')}`;
    }
    if (!errors.review_title && !errors.title && !errors.category && !errors.body && !values.assessment) {
        errors.assessment = `${t('assessment')}`;
    }
    return errors;
};
