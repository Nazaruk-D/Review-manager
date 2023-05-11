import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { CATEGORIES } from '../../../common/constants/constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { categoryFilterSelector, sortReviewsFilterSelector, sortSearchSortSelector } from '../../../store/selectors/sortSelector';
import { selectorUserReviews } from '../../../store/selectors/reviewSelector';
import { setCategoryFilter, setReviewFilter, setSearchSort, setSortedReviews } from '../../../store/slices/sortSlice';
import { sortReviewsUtil } from '../../../utils/sort-utils';
import { getCategoryTranslation } from '../../../utils/getCategoryTranslation';
import { Sort } from '../../../enums/sort';
import { CategoryFilterType } from '../../../types/CategoryFilterType';

const FilterSortPanel = () => {
    const dispatch = useAppDispatch();
    const categoryFilter = useAppSelector(categoryFilterSelector);
    const reviewsFilter = useAppSelector(sortReviewsFilterSelector);
    const searchSort = useAppSelector(sortSearchSortSelector);
    const reviews = useAppSelector(selectorUserReviews);
    const { t } = useTranslation('translation', { keyPrefix: 'table' });

    const handleCategoryFilterChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            dispatch(setCategoryFilter(event.target.value));
        }
    };

    const handleSortOrderChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            dispatch(setReviewFilter(event.target.value));
        }
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value) {
            dispatch(setSearchSort(event.target.value));
        } else {
            dispatch(setSearchSort(''));
        }
    };

    useEffect(() => {
        if (reviews) {
            const sortReviews = sortReviewsUtil(categoryFilter, reviewsFilter, searchSort, reviews);
            dispatch(setSortedReviews(sortReviews));
        }
    }, [categoryFilter, reviewsFilter, searchSort, reviews]);

    return (
        <Grid container sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12} md={5.6} sx={{ mb: { xs: 1 } }}>
                <TextField id="search" label={t('search')} variant="outlined" onChange={handleSearch} fullWidth />
            </Grid>
            <Grid item xs={12} md={3} sx={{ mb: { xs: 1 } }}>
                <FormControl fullWidth>
                    <InputLabel id="category-filter-label">{t('category')}</InputLabel>
                    <Select
                        labelId="category-filter-label"
                        id="category-filter"
                        value={categoryFilter}
                        onChange={handleCategoryFilterChange}
                    >
                        {CATEGORIES.map((category: CategoryFilterType) => (
                            <MenuItem key={category} value={category}>
                                {getCategoryTranslation(category)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                    <InputLabel id="sort-order-label">{t('sort')}</InputLabel>
                    <Select labelId="sort-order-label" id="sort-order" value={reviewsFilter} onChange={handleSortOrderChange}>
                        <MenuItem value={Sort.None}>{t('none')}</MenuItem>
                        <MenuItem value={Sort.NameAZ}>{t('nameAZ')}</MenuItem>
                        <MenuItem value={Sort.NameZA}>{t('nameZA')}</MenuItem>
                        <MenuItem value={Sort.DateOldNew}>{t('dateOldNew')}</MenuItem>
                        <MenuItem value={Sort.DateNewOld}>{t('dateNewOld')}</MenuItem>
                        <MenuItem value={Sort.Likes}>{t('likes')}</MenuItem>
                        <MenuItem value={Sort.Assessment}>{t('assessmentHL')}</MenuItem>
                        <MenuItem value={Sort.AvgRating}>{t('assessmentLH')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default FilterSortPanel;
