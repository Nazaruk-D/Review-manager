import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { ReviewType } from '../../types/ReviewType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { CreateReviewType } from '../../types/CreateReviewType';

export const reviewAPI = createApi({
    reducerPath: 'review',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getReviews: builder.query<ResponseType<ReviewResponseType>, ReviewType>({
            query: () => `${PathAPI.Review}`,
        }),
        createReview: builder.mutation<ResponseType<ReviewResponseType>, CreateReviewType>({
            query: ({ title, category, rating, photo, body, tags, review_title, author_id }) => ({
                url: `${PathAPI.Review}`,
                method: 'POST',
                body: { title, category, rating, photo, body, tags, review_title, author_id },
            }),
        }),
    }),
});

export const { useCreateReviewMutation } = reviewAPI;
