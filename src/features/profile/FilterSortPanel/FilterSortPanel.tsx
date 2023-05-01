import React, { ChangeEvent, useEffect } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { CATEGORIES } from '../../../common/constants/constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { categoryFilterSelector, sortReviewsFilterSelector, sortSearchSortSelector } from '../../../store/selectors/sortSelector';
import { selectorUserReviews } from '../../../store/selectors/reviewSelector';
import { setCategoryFilter, setReviewFilter, setSearchSort, setSortedReviews } from '../../../store/slices/sortSlice';
import { sortReviewsUtil } from '../../../utils/sort-utils';
import { Sort } from '../../../enums/sort';
import { Category } from '../../../enums/category';

const FilterSortPanel = () => {
    const dispatch = useAppDispatch();
    const categoryFilter = useAppSelector(categoryFilterSelector);
    const reviewsFilter = useAppSelector(sortReviewsFilterSelector);
    const searchSort = useAppSelector(sortSearchSortSelector);
    const reviews = useAppSelector(selectorUserReviews);

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
        <Grid container sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12} md={5.6} sx={{ mb: { xs: 1 } }}>
                <TextField id="search" label="Search" variant="outlined" onChange={handleSearch} fullWidth />
            </Grid>
            <Grid item xs={12} md={3} sx={{ mb: { xs: 1 } }}>
                <FormControl fullWidth>
                    <InputLabel id="category-filter-label">Category</InputLabel>
                    <Select
                        labelId="category-filter-label"
                        id="category-filter"
                        value={categoryFilter}
                        onChange={handleCategoryFilterChange}
                    >
                        <MenuItem value={Category.All}>All</MenuItem>
                        {CATEGORIES.map((category: string) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                    <InputLabel id="sort-order-label">Sort By</InputLabel>
                    <Select labelId="sort-order-label" id="sort-order" value={reviewsFilter} onChange={handleSortOrderChange}>
                        <MenuItem value={Sort.None}>None</MenuItem>
                        <MenuItem value={Sort.NameAZ}>Name (A-Z)</MenuItem>
                        <MenuItem value={Sort.NameZA}>Name (Z-A)</MenuItem>
                        <MenuItem value={Sort.DateOldNew}>Date (Oldest-Newest)</MenuItem>
                        <MenuItem value={Sort.DateNewOld}>Date (Newest-Oldest)</MenuItem>
                        <MenuItem value={Sort.Likes}>Likes (Most to Least)</MenuItem>
                        <MenuItem value={Sort.Assessment}>Assessment (Highest to Lowest)</MenuItem>
                        <MenuItem value={Sort.AvgRating}>Average Rating (Highest to Lowest)</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default FilterSortPanel;
