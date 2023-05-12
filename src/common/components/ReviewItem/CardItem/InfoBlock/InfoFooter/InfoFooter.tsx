import React, { FC } from 'react';
import { TFunction } from 'i18next';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import { ReviewResponseType } from '../../../../../../types/ReviewResponseType';

type InfoFooterPropsType = {
    review: ReviewResponseType;
    t: TFunction;
};

const InfoFooter: FC<InfoFooterPropsType> = ({ review, t }) => {
    const navigate = useNavigate();
    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/profile/${review.author_id}`);
    };
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                {t('reviewed')}{' '}
                <Typography variant="subtitle2" component="span" color="text.secondary">
                    <Typography
                        variant="subtitle2"
                        component="span"
                        color="text.secondary"
                        onClick={onClickHandler}
                        sx={{
                            '&:hover': {
                                color: 'rgba(255, 99, 71,1)',
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {review.author_name}
                    </Typography>
                    <FavoriteIcon sx={{ fontSize: '10px', ml: 0.5, mr: 0.2 }} />
                    {review.authorLikes}
                </Typography>
                , {dateFormat(review.created_at, 'mm/dd/yyyy')}
            </Typography>
        </Box>
    );
};

export default InfoFooter;
