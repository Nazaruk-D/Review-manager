import React, { FC } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import s from './ReviewRow.module.scss';
import noImage from '../../../../common/png/logo.png';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import { useDeleteReviewByIdMutation } from '../../../../store/api/reviewAPISlice';
import { Role } from '../../../../enums/role';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../store/selectors/userSelector';
import DeleteTableCell from '../../../../common/components/DelteTableCell/DeleteTableCell';

type CardsRowPropsType = {
    review: ReviewResponseType;
    index: number;
};

const ReviewRow: FC<CardsRowPropsType> = ({ review, index }) => {
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);
    const navigate = useNavigate();
    const [deleteReview, { isLoading, isSuccess }] = useDeleteReviewByIdMutation();

    const onDeleteReviewHandler = () => {
        deleteReview({ reviewId: review.id });
    };

    const onEditReviewHandler = () => {
        navigate(`/update-review/${review.id}`);
    };

    return (
        <TableRow className={s.row} onClick={() => navigate(`/review/${review.id}`)}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <img src={review.images?.[0] ?? noImage} alt={review.title} className={s.image} />
            </TableCell>
            <TableCell>
                {review.review_title.length > 15 ? `${review.review_title.substring(0, 15)}...` : review.review_title}
            </TableCell>
            <TableCell>{review.category}</TableCell>
            <TableCell>{dateFormat(review.created_at, 'mm/dd/yyyy')}</TableCell>
            <TableCell>{review.assessment}</TableCell>
            <TableCell>{review.avg_rating ? review.avg_rating : '-'}</TableCell>
            <TableCell>{review.likes.length}</TableCell>
            {(userID === review.author_id || isAdmin === Role.Admin) && (
                <DeleteTableCell
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    deleteHandler={onDeleteReviewHandler}
                    editHandler={onEditReviewHandler}
                    editIcon
                />
            )}
        </TableRow>
    );
};

export default ReviewRow;
