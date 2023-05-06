import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

    const handleDownloadPDF = () => {
        const input = document.getElementById('review-pdf');
        html2canvas(input!).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [210, 297],
            });
            pdf.addImage(imgData, 'PNG', 3, 0, 206, (canvas.height * 206) / canvas.width);
            pdf.save(`${review?.data.review_title}.pdf`);
        });
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
            <div id="review-pdf">
                <ReviewHeader review={review!.data} />
                <ReviewBody review={review!.data} />
            </div>
            <Button variant="contained" color="primary" onClick={handleDownloadPDF} sx={{ mb: 2 }}>
                Скачать обзор в PDF
            </Button>
            {isLogin && <SendCommentForm ws={ws!} sendComment={sendComment} />}
            <CommentsBlock ws={ws!} />
        </Container>
    );
};

export default Review;
