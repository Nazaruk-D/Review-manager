import { FormikValues } from 'formik';
import { TFunction } from 'i18next';
import { AuthErrorType } from '../../../types/FormikErrorTypes';

export const loginValidation = (values: FormikValues, t: TFunction) => {
    const errors: AuthErrorType = {};
    if (!values.email) {
        errors.email = `${t('email')}`;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = `${t('email invalid')}`;
    }

    if (!values.password) {
        errors.password = `${t('password')}`;
    } else if (values.password.length < 6) {
        errors.password = `${t('password min')}`;
    } else if (values.password.length > 30) {
        errors.password = `${t('password max')}`;
    }

    return errors;
};
