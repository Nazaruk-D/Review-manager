import React from 'react';
import { Container } from '@mui/material';
import CardHeader from './CardHeader/CardHeader';
import CardDescription from './CardDescription/CardDescription';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import SendCommentForm from './SendCommentForm/SendCommentForm';

const Review = () => {
    return (
        <Container sx={{ mt: '1rem', backgroundColor: 'red' }}>
            <CardHeader />
            <CardDescription />
            <CommentsBlock />
            <SendCommentForm />
        </Container>
    );
};

export default Review;
