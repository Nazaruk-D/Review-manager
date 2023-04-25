import React from 'react';
import { TagCloud } from 'react-tagcloud';
import { Box } from '@mui/material';

const data = [
    { value: 'JavaScript', count: 80, color: 'grey' },
    { value: 'React', count: 50, color: 'grey' },
    { value: 'Node.js', count: 60, color: 'grey' },
    { value: 'HTML', count: 40, color: 'grey' },
    { value: 'CSS', count: 30, color: 'grey' },
    { value: 'TypeScript', count: 20, color: 'grey' },
    { value: 'Webpack', count: 30, color: 'grey' },
    { value: 'Redux', count: 40, color: 'grey' },
];

const TagCloudBox = () => {
    return (
        <Box>
            <TagCloud tags={data} minSize={12} maxSize={35} shuffle />
        </Box>
    );
};

export default TagCloudBox;
