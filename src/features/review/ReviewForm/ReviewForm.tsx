import React, { useState } from 'react';
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
import { ReviewType } from '../../../types/ReviewType';
import { useCreateReviewMutation } from '../../../store/api/reviewAPI';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserData } from '../../../store/selectors/userSelector';
import UploadImage from '../../../common/components/UploadImage/UploadImage';
import { ReviewErrorType } from '../../../types/FormikErrorTypes';
import { ErrorStyle } from '../../../styles/common/ErrorStyle';

export const ReviewForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const { t } = useTranslation('translation', { keyPrefix: 'review editor' });
    const { t: tc } = useTranslation('translation', { keyPrefix: 'category' });
    const { t: tv } = useTranslation('translation', { keyPrefix: 'validator' });
    const user = useAppSelector(selectorUserData);
    const [sendReview, { isLoading }] = useCreateReviewMutation();
    const formik = useFormik({
        initialValues: {
            review_title: '',
            title: '',
            category: '',
            body: '',
            rating: null,
            tags: [],
            photo: null,
        } as ReviewType,
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
            if (!errors.review_title && !errors.title && !errors.category && !errors.body && !values.rating) {
                errors.rating = `${tv('rating')}`;
            }
            return errors;
        },
        onSubmit: async (values) => {
            if (values) {
                sendReview({ ...values, author_id: user!.id, author_name: user!.user_name });
            }
        },
    });

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
                                    aria-label="rating"
                                    name="rating"
                                    value={formik.values.rating}
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
                        {formik.touched.body && formik.errors.rating && (
                            <Grid item xs={12} sx={{ color: 'green', fontSize: '14px', fontWeight: 600 }}>
                                {formik.errors.rating}
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
                            <UploadImage image={image} setImage={setImage} />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        {isLoading ? <CircularProgress size={24} /> : t('save review')}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
