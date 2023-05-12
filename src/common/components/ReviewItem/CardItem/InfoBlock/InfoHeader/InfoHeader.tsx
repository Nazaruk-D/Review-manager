import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Like from '../../../../Like/Like';
import { useAppSelector } from '../../../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../../../store/selectors/userSelector';
import { ReviewResponseType } from '../../../../../../types/ReviewResponseType';
import { Role } from '../../../../../../enums/role';

type InfoHeaderPropsType = {
    review: ReviewResponseType;
    flexDirection: 'row' | 'column';
};

const InfoHeader: FC<InfoHeaderPropsType> = ({ review, flexDirection }) => {
    const navigate = useNavigate();
    const isAdmin = useAppSelector(selectorRole);
    const userId = useAppSelector(selectorUserId);
    let title = review.review_title;

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate(`/update-review/${review.id}`);
    };

    if (flexDirection !== 'row') {
        if (review.review_title.length > 30) {
            title = `${review.review_title.slice(0, 25)}...`;
        }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h5" component="h5" gutterBottom sx={{ m: 0, mr: 1 }}>
                    {title}
                </Typography>
                {(userId === review.author_id || isAdmin === Role.Admin) && (
                    <IconButton onClick={onEditReviewHandler}>
                        <EditOutlinedIcon />
                    </IconButton>
                )}
            </Box>
            <Like userId={userId!} reviewId={review.id} likes={review.likes} />
        </Box>
    );
};

export default InfoHeader;
