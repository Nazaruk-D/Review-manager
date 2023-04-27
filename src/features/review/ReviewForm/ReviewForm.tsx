import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReviewType } from '../../../types/ReviewType';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserData } from '../../../store/selectors/userSelector';
import UploadImage from '../../../common/components/UploadImage/UploadImage';
import { ReviewErrorType } from '../../../types/FormikErrorTypes';
import { ErrorStyle } from '../../../styles/common/ErrorStyle';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import { useSendReviewMutation } from '../../../store/api/reviewAPISlice';

export const ReviewForm = () => {
    const navigate = useNavigate();
    const { userId = '' } = useParams<string>();
    const { reviewId = '' } = useParams<string>();
    const location = useLocation();
    const review: ReviewResponseType = location.state;
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const { t } = useTranslation('translation', { keyPrefix: 'review editor' });
    const { t: tc } = useTranslation('translation', { keyPrefix: 'category' });
    const { t: tv } = useTranslation('translation', { keyPrefix: 'validator' });
    const user = useAppSelector(selectorUserData);
    const [sendReview, { isLoading, isError, isSuccess, status, data }] = useSendReviewMutation();
    let initial;
    let image;
    let url: string;
    const profileId = review ? review.author_id : userId;

    if (review) {
        initial = {
            review_title: review.review_title,
            title: review.title,
            category: review.category,
            body: review.body,
            assessment: review.assessment,
            tags: review.tags,
        };
        image = review.image;
        url = 'update-review';
    } else {
        initial = {
            review_title: '',
            title: '',
            category: '',
            body: '',
            assessment: '',
            tags: [],
        };
        image = '';
        url = 'create-review';
    }

    const formik = useFormik({
        initialValues: initial as ReviewType,
        validate: (values) => {
            const errors: ReviewErrorType = {};
            if (!values.review_title) {
                errors.review_title = `${tv('review title')}`;
            }
            if (!values.title) {
                errors.title = `${tv('title')}`;
            }
            if (!values.category) {
                errors.category = `${tv('category')}`;
            }
            if (!values.body) {
                errors.body = `${tv('body')}`;
            }
            if (!errors.review_title && !errors.title && !errors.category && !errors.body && !values.assessment) {
                errors.assessment = `${tv('assessment')}`;
            }
            return errors;
        },
        onSubmit: async (values) => {
            if (values) {
                console.log('VALUES: ', values);
                sendReview({
                    ...values,
                    author_name: user!.user_name,
                    uploadImage,
                    author_id: profileId,
                    reviewId,
                    url,
                });
            }
        },
    });

    const newReviewDisable = !(formik.isValid && formik.dirty);
    const isDisable = review ? !review : newReviewDisable;
    useEffect(() => {
        if (isSuccess) {
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
                    sx={{
                        display: 'flex',
                        fontWeight: 700,
                        color: 'textSecondary',
                        textDecoration: 'none',
                        mb: 2,
                    }}
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
                            <TextField label={t('title')} fullWidth {...formik.getFieldProps('title')} />
                        </Grid>
                        {formik.touched.title && formik.errors.title && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.title}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{t('category')}</InputLabel>
                                <Select labelId="demo-simple-select-label" {...formik.getFieldProps('category')}>
                                    <MenuItem value="Movies">{tc('movies')}</MenuItem>
                                    <MenuItem value="Books">{tc('books')}</MenuItem>
                                    <MenuItem value="Games">{tc('games')}</MenuItem>
                                    <MenuItem value="Food">{tc('food')}</MenuItem>
                                    <MenuItem value="Cars">{tc('cars')}</MenuItem>
                                    <MenuItem value="Other">{tc('other')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {formik.touched.category && formik.errors.category && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.category}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField label={t('text')} fullWidth rows={4} multiline {...formik.getFieldProps('body')} />
                        </Grid>
                        {formik.touched.body && formik.errors.body && (
                            <Grid item xs={12} sx={ErrorStyle}>
                                {formik.errors.body}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t('rating')}</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="assessment"
                                    name="assessment"
                                    value={formik.values.assessment}
                                    onChange={formik.handleChange}
                                >
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={(index + 1).toString()}
                                            control={<Radio />}
                                            label={(index + 1).toString()}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
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
                                options={[]}
                                renderInput={(params) => (
                                    <TextField {...params} label={t('tags')} fullWidth placeholder={t('press enter')!} />
                                )}
                                onChange={(_, value) => formik.setFieldValue('tags', value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage image={uploadImage} setImage={setUploadImage} dbImage={image} />
                        </Grid>
                    </Grid>
                    <Button variant="contained" type="submit" fullWidth sx={{ mt: 2, mb: 2 }} disabled={isDisable}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : t('save review')}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
