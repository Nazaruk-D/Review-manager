import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactWordCloud from 'react-wordcloud';
import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setSearch } from '../../../store/slices/reviewSlice';
import { TagsCloudType } from '../../../types/TagsCloudType';
import { Path } from '../../../enums/path';

type TagCloudBoxPropsType = {
    tags: TagsCloudType[];
    isLoading: boolean;
};

const TagCloudBox: FC<TagCloudBoxPropsType> = ({ tags, isLoading }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'main page' });

    const callbacks = {
        onWordClick: (word: { text: string; value: number }) => {
            dispatch(setSearch(word.text));
            navigate(Path.Result);
        },
    };

    return (
        <Box>
            <Typography variant="h4" style={{ marginBottom: '15px' }}>
                {t('popular tags')}
            </Typography>
            {!isLoading && tags && tags.length > 0 && (
                <ReactWordCloud
                    options={{
                        fontFamily: 'courier new',
                        fontSizes: [15, 45],
                        padding: 5,
                        rotations: 2,
                        rotationAngles: [0, 0],
                        colors: ['black', 'grey', '#2B2B2B', '#5D6D7E', '#6C7A89'],
                        enableTooltip: false,
                    }}
                    maxWords={60}
                    callbacks={callbacks}
                    words={tags.map((tag) => ({ text: tag.name, value: tag.total_mentions }))}
                />
            )}
        </Box>
    );
};

export default memo(TagCloudBox);
