import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import SendCommentForm from './SendCommentForm/SendCommentForm';
import ReviewHeader from './ReviewHeader/ReviewHeader';
import ReviewBody from './ReviewBody/ReviewBody';
import Loader from '../../../common/components/Loader/Loader';
import { useGetReviewByIdQuery } from '../../../store/api/reviewAPISlice';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { selectorIsLogin, selectorUserId } from '../../../store/selectors/userSelector';

const Review = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectorIsLogin);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { reviewId = '' } = useParams<string>();
    const [ws, setWs] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
    const { data: review, isLoading, error } = useGetReviewByIdQuery({ reviewId });
    const userId = useAppSelector(selectorUserId);
    const remoteWebSocketBaseUrl = process.env.REACT_APP_REMOTE_WB_BASE_URL;
    const sendComment = async (comment: string) => {
        if (reviewId && userId && comment && ws) {
            const body = { reviewId, userId, comment };
            ws.emit('newComment', body);
        }
    };

    useEffect(() => {
        if (!ws) {
            const socket = io(remoteWebSocketBaseUrl!);
            setWs(socket);
        }
        return () => {
            ws?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (ws) {
            ws.emit('subscribe', reviewId);
            return () => {
                ws.emit('unsubscribe', reviewId);
            };
        }
        return undefined;
    }, [ws, reviewId]);

    if (error) {
        dispatch(setAppErrorAC(t('error get review')));
    }
    if (isLoading) return <Loader />;

    return (
        <Container sx={{ mt: '2rem' }}>
            <ReviewHeader review={review!.data} />
            <ReviewBody review={review!.data} />
            {isLogin && <SendCommentForm ws={ws!} sendComment={sendComment} />}
            <CommentsBlock ws={ws!} />
        </Container>
    );
};

export default Review;
