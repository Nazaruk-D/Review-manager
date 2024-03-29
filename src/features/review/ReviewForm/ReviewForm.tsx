import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Autocomplete, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { selectorUserData } from '../../../store/selectors/userSelector';
import { selectorThemeApp } from '../../../store/selectors/appSelector';
import UploadImage from '../../../common/components/UploadImage/UploadImage';
import { useSendReviewMutation } from '../../../store/api/reviewAPISlice';
import { useGetProductNamesQuery, useGetTagsQuery } from '../../../store/api/itemAPI';
import MarkDownEditor from '../../../common/components/MarkDownEditor/MarkDownEditor';
import SelectCategory from '../../../common/components/SelectCategory/SelectCategory';
import { validateForm } from './validateForm';
import AssessmentControl from '../../../common/components/AssessmentControl/AssessmentControl';
import { setAppInformMessage } from '../../../store/slices/appSlice';
import { buttonStyles } from '../../../styles/common/buttonStyles';
import { ErrorStyle } from '../../../styles/common/ErrorStyle';
import { ReviewType } from '../../../types/ReviewType';

type ReviewFromPropsType = {
    initial: ReviewType;
    url: string;
    images: string[];
    profileId: string;
    reviewId: string;
};

export const ReviewForm: FC<ReviewFromPropsType> = ({ initial, url, images, profileId, reviewId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const themeColor = useAppSelector(selectorThemeApp);
    const [uploadImage, setUploadImage] = useState<File[] | null>(null);
    const { data: tagsData, isLoading: tagsLoading, error: tagsError } = useGetTagsQuery({});
    const { data: productNames, isLoading: productNamesLoading, error: productNamesError } = useGetProductNamesQuery({});
    const [sendReview, { isSuccess, isLoading }] = useSendReviewMutation();
    const { t } = useTranslation('translation', { keyPrefix: 'review editor' });
    const { t: tValidate } = useTranslation('translation', { keyPrefix: 'validation' });
    const { t: tSnackbar } = useTranslation('translation', { keyPrefix: 'snackbar messages' });
    const tags = tagsData?.data ? tagsData?.data.map((tag) => tag.name) : [];

    const formik = useFormik({
        initialValues: initial,
        validate: (values) => validateForm(values, tValidate),
        onSubmit: async (values) => {
            if (values) {
                sendReview({
                    ...values,
                    uploadImage,
                    author_id: profileId,
                    reviewId,
                    url,
                });
            }
        },
    });

    const newReviewDisable = !(formik.isValid && formik.dirty);
    const isDisable = url === 'update-review' ? false : newReviewDisable;
    const style = buttonStyles(themeColor);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAppInformMessage(tSnackbar('add review')));
            navigate(`/profile/${profileId}`);
        }
    }, [isSuccess, navigate]);

    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <Box>
                <Typography
                    variant="h4"
                    noWrap
                    component="h4"
                    sx={{ display: 'flex', fontWeight: 700, color: 'textSecondary', textDecoration: 'none', mb: 2 }}
                >
                    {t('review editor')}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label={t('review title')} fullWidth {...formik.getFieldProps('review_title')} />
                        </Grid>
                        {formik.touched.review_title && formik.errors.review_title && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.review_title}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Autocomplete
                                freeSolo
                                options={productNames?.data || []}
                                value={formik.values.title}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('title')}
                                        fullWidth
                                        placeholder={t('title')!}
                                        onBlur={() => {
                                            formik.handleBlur('title');
                                            formik.setFieldValue('title', params.inputProps.value);
                                        }}
                                    />
                                )}
                                onChange={(_, value) => {
                                    formik.setFieldValue('title', value!);
                                }}
                            />
                        </Grid>
                        {formik.touched.title && formik.errors.title && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.title}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <SelectCategory formik={formik} />
                        </Grid>
                        {formik.touched.category && formik.errors.category && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.category}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <MarkDownEditor formik={formik} />
                        </Grid>
                        {formik.touched.body && formik.errors.body && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.body}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <AssessmentControl formik={formik} themeColor={themeColor} t={t} />
                        </Grid>
                        {formik.touched.body && formik.errors.assessment && (
                            <Grid item xs={12} sx={{ color: 'green', fontSize: '14px', fontWeight: 600 }}>
                                {formik.errors.assessment}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                freeSolo
                                options={tags}
                                autoSelect
                                value={formik.values.tags}
                                onOpen={() => formik.handleBlur('tags')}
                                renderInput={(params) => (
                                    <TextField {...params} label={t('tags')} fullWidth onBlur={formik.handleBlur('tags')} />
                                )}
                                onChange={(_, value) => {
                                    formik.setFieldValue('tags', value);
                                    formik.handleBlur('tags');
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage images={uploadImage} setImages={setUploadImage} dbImages={images} multiple />
                        </Grid>
                    </Grid>
                    <Button variant="contained" type="submit" fullWidth sx={style} disabled={isDisable}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : t('save review')}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
