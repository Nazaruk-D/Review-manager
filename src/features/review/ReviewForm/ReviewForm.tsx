import React from 'react';
import { useFormik } from 'formik';
import {
    Autocomplete,
    Box,
    Button,
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

interface IReview {
    title: string;
    category: string;
    text: string;
    rating: number;
    tags: string[];
    photo: string | null;
}

export const ReviewForm = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'review editor' });
    const { t: tc } = useTranslation('translation', { keyPrefix: 'category' });

    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            text: '',
            rating: null,
            tags: [],
            tagsInputValue: '',
            photo: null,
        },
        validate: (values) => {
            const errors = {};
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
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
                                    <MenuItem value="Other">{tc('other')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={t('text')} fullWidth rows={4} multiline {...formik.getFieldProps('text')} />
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
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                {...formik.getFieldProps('photo')}
                            />
                            <Button
                                variant="contained"
                                component="span"
                                onClick={(event) => {
                                    event.preventDefault();
                                    document.getElementById('photo-upload')!.click();
                                }}
                            >
                                {t('add photo')}
                            </Button>
                        </Grid>
                    </Grid>
                    <Button type="submit">{t('save review')}</Button>
                </form>
            </Box>
        </Container>
    );
};