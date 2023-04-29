import React, { FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { FormikValues } from 'formik';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorThemeApp } from '../../../store/selectors/appSelector';
import styles from './MarkDownEditor.module.scss';

type MarkDownEditorPropsType = {
    formik: FormikValues;
};

const MarkDownEditor: FC<MarkDownEditorPropsType> = ({ formik }) => {
    const color = useAppSelector(selectorThemeApp);
    const previewOptions = {
        className: styles['md-editor-preview'],
    };

    return (
        <Box data-color-mode={color}>
            <MDEditor
                id="body"
                value={formik.values.body}
                onChange={(val: string | undefined) => formik.handleChange('body')(val!)}
                onBlur={formik.handleBlur}
                aria-required
                className={styles['md-editor']}
                previewOptions={previewOptions}
                onBlurCapture={() => formik.setTouched({ ...formik.touched, body: true })}
            />
        </Box>
    );
};

export default MarkDownEditor;
