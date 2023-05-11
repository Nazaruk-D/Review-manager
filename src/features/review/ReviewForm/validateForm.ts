import { TFunction } from 'i18next';
import { FormikValues } from 'formik';
import { ReviewErrorType } from '../../../types/FormikErrorTypes';

export const validateForm = (values: FormikValues, t: TFunction) => {
    const errors: ReviewErrorType = {};
    if (!values.review_title) {
        errors.review_title = `${t('review title')}`;
    } else if (values.review_title.length > 70) {
        errors.review_title = `${t('review title max')}`;
    }

    if (!values.title) {
        errors.title = `${t('title')}`;
    } else if (values.title.length > 50) {
        errors.title = `${t('title max')}`;
    }

    if (!values.category) {
        errors.category = `${t('category')}`;
    }

    if (!values.body) {
        errors.body = `${t('body')}`;
    } else if (values.body.length > 2000) {
        errors.body = `${t('body max')}`;
    }

    if (!errors.review_title && !errors.title && !errors.category && !errors.body && !values.assessment) {
        errors.assessment = `${t('assessment')}`;
    }
    return errors;
};
