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

export const ReviewForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const { t } = useTranslation('translation', { keyPrefix: 'review editor' });
    const { t: tc } = useTranslation('translation', { keyPrefix: 'category' });
    const user = useAppSelector(selectorUserData);
    const [sendReview, { isLoading }] = useCreateReviewMutation();
    const formik = useFormik({
        initialValues: {
            title: '',
            review_title: '',
            category: '',
            body: '',
            rating: null,
            tags: [],
            photo: null,
        } as ReviewType,
        validate: (values) => {
            const errors = {};
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
                        <Grid item xs={12}>
                            <TextField label={t('title')} fullWidth {...formik.getFieldProps('title')} />
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField label={t('text')} fullWidth rows={4} multiline {...formik.getFieldProps('body')} />
                        </Grid>
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
                    <Button variant="contained" type="submit" fullWidth sx={{ mt: 2, mb: 2 }}>
                        {isLoading ? <CircularProgress size={24} /> : t('save review')}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
