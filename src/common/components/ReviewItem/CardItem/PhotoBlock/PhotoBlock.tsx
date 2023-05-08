import React, { FC, useState } from 'react';
import { Box, CardMedia, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import noImage from '../../../../png/logo.png';

type PhotoBlockPropsType = {
    mediaWidth: string;
    reviewImages: string[] | undefined;
};

const PhotoBlock: FC<PhotoBlockPropsType> = ({ reviewImages, mediaWidth }) => {
    const [photoNumber, setPhotoNumber] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnterHandler = () => {
        setIsHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setIsHovered(false);
    };

    const setNextImage = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (photoNumber !== 0) {
            setPhotoNumber((prev) => prev - 1);
        }
    };

    const setPreviousImage = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (photoNumber !== reviewImages?.length) {
            setPhotoNumber((prev) => prev + 1);
        }
    };

    return (
        <Box
            sx={{ position: 'relative', height: '220px', width: mediaWidth }}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {isHovered && (
                <>
                    <Box sx={{ position: 'absolute', left: '3%', top: '40%' }}>
                        <IconButton onClick={setNextImage}>
                            <ChevronLeftIcon
                                color="warning"
                                fontSize="large"
                                sx={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '50%' }}
                            />
                        </IconButton>
                    </Box>
                    <Box sx={{ position: 'absolute', right: '3%', top: '40%' }}>
                        <IconButton onClick={setPreviousImage}>
                            <ChevronRightIcon
                                color="warning"
                                fontSize="large"
                                sx={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '50%' }}
                            />
                        </IconButton>
                    </Box>
                </>
            )}
            <CardMedia sx={{ height: '100%', width: '100%' }} image={reviewImages?.[photoNumber] ?? noImage} title="review" />
        </Box>
    );
};

export default PhotoBlock;
