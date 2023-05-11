import React, { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactWordCloud from 'react-wordcloud';
import Loader from '../../../common/components/Loader/Loader';
import { useAppDispatch } from '../../../hooks/useRedux';
import { Path } from '../../../enums/path';
import { setSearch } from '../../../store/slices/reviewSlice';
import { TagsCloudType } from '../../../types/TagsCloudType';

type TagCloudBoxPropsType = {
    tags: TagsCloudType[];
    isLoading: boolean;
};

const TagCloudBox: FC<TagCloudBoxPropsType> = ({ tags, isLoading }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const callbacks = {
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
                        rotationAngles: [0, 0],
                        colors: ['black', 'grey', '#2B2B2B', '#5D6D7E', '#6C7A89'],
                        enableTooltip: false,
                    }}
                    maxWords={100}
                    callbacks={callbacks}
                    words={tags.map((tag) => ({ text: tag.name, value: tag.total_mentions }))}
                />
            )}
        </Box>
    );
};

export default memo(TagCloudBox);
