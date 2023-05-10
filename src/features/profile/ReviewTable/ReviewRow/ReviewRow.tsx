import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import s from './ReviewRow.module.scss';
import noImage from '../../../../common/png/logo.png';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import { Role } from '../../../../enums/role';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../store/selectors/userSelector';
import DeleteTableCell from '../../../../common/components/DelteTableCell/DeleteTableCell';
import { getCategoryTranslation } from '../../../../utils/getCategoryTranslation';

type CardsRowPropsType = {
    deleteReview: (reviewId: string) => void;
    editReview: (reviewId: string) => void;
    review: ReviewResponseType;
    index: number;
    isSuccess: boolean;
    isLoading: boolean;
};

const ReviewRow: FC<CardsRowPropsType> = ({ review, index, deleteReview, editReview, isSuccess, isLoading }) => {
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);
    const navigate = useNavigate();

    const onDeleteReviewHandler = () => {
        deleteReview(review.id);
    };

    const onEditReviewHandler = () => {
        editReview(review.id);
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
            <TableCell>{getCategoryTranslation(review.category)}</TableCell>
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
