import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactWordCloud from 'react-wordcloud';
import { useGetPopularTagsQuery } from '../../../store/api/reviewAPISlice';
import Loader from '../../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import { Path } from '../../../enums/path';
import { setSearch } from '../../../store/slices/reviewSlice';

const TagCloudBox = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetPopularTagsQuery({});
    const tags = data?.data || [];

    if (error) {
        dispatch(setAppErrorAC('Error getting reviews'));
    }

    const callbacks = {
        getWordTooltip: (word: { text: string; value: number }) => `The word "${word.text}" appears ${word.value} times.`,
        onWordClick: (word: { text: string; value: number }) => {
            dispatch(setSearch(word.text));
            navigate(Path.Result);
        },
    };

    return (
        <Box>
            <Typography variant="h4" style={{ marginBottom: '15px' }}>
                Popular tags
            </Typography>
            {!isLoading && tags && tags.length > 0 && (
                <ReactWordCloud
                    options={{
                        fontFamily: 'courier new',
                        fontSizes: [25, 40],
                        padding: 5,
                        rotations: 2,
                        rotationAngles: [-90, 0],
                        colors: ['black', 'grey', '#2B2B2B', '#5D6D7E', '#6C7A89'],
                    }}
                    maxWords={100}
                    callbacks={callbacks}
                    words={tags.map((tag) => ({ text: tag.name, value: tag.total_mentions }))}
                />
            )}
            {isLoading && <Loader />}
        </Box>
    );
};

export default TagCloudBox;
