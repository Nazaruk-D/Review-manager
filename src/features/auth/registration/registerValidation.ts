import { FormikValues } from 'formik';
import { TFunction } from 'i18next';
import { AuthErrorType } from '../../../types/FormikErrorTypes';

export const registerValidation = (values: FormikValues, t: TFunction) => {
    const errors: AuthErrorType = {};
    if (!values.user_name) {
        errors.user_name = `${t('name')}`;
    } else if (values.user_name.length < 2) {
        errors.user_name = `${t('name min')}`;
    } else if (values.user_name.length > 20) {
        errors.user_name = `${t('name max')}`;
    }

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

    if (!values.confirmPassword) {
        errors.confirmPassword = `${t('password')}`;
    } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = `${t('password min')}`;
    } else if (values.password.length > 30) {
        errors.confirmPassword = `${t('password max')}`;
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = `${t('not match')}`;
    }
    return errors;
};
