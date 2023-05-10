import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import SendCommentForm from './SendCommentForm/SendCommentForm';
import ReviewBody from './ReviewBody/ReviewBody';
import Loader from '../../../common/components/Loader/Loader';
import { useGetReviewByIdQuery } from '../../../store/api/reviewAPISlice';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { selectorIsLogin, selectorUserId } from '../../../store/selectors/userSelector';
import CardItem from '../../../common/components/ReviewItem/CardItem/CardItem';
import { ReviewResponseType } from '../../../types/ReviewResponseType';

const Review = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectorIsLogin);
    const { t } = useTranslation('translation', { keyPrefix: 'action' });
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

    const handleDownloadPDF = async () => {
        const input = document.getElementById('review');
        html2canvas(input!, { logging: true, allowTaint: true, useCORS: true }).then((canvas) => {
            const imgWidth = 206;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imageData = canvas.toDataURL('img/png');
            const pdf = new JsPDF('p', 'mm', 'a4');
            pdf.addImage(imageData, 'PNG', 3, 3, imgWidth, imgHeight);
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
        dispatch(setAppErrorAC('error get review'));
    }
    if (isLoading) return <Loader />;

    return (
        <Container sx={{ mt: '2rem' }}>
            <div id="review">
                <CardItem review={review!.data} flexDirection="row" mediaWidth="30%" contentWidth="70%" paddingLeft={2} />
                <ReviewBody review={review!.data} />
            </div>
            <Button variant="contained" color="primary" onClick={handleDownloadPDF} sx={{ mb: 2 }}>
                {t('download')}
            </Button>
            {review?.data && review?.data.similarReview?.length > 0 && (
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Похожие отзывы по теме
                    </Typography>
                    <Grid container spacing={2}>
                        {review?.data.similarReview.map((similarReview) => (
                            <Grid item key={similarReview.id} xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{similarReview.review_title}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Автор: {similarReview.author_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {isLogin && <SendCommentForm ws={ws!} sendComment={sendComment} />}
            <CommentsBlock ws={ws!} />
        </Container>
    );
};
export default Review;
