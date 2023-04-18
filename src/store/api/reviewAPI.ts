import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { CreateReviewType } from '../../types/CreateReviewType';

export const reviewAPI = createApi({
    reducerPath: 'review',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getReviews: builder.query<ResponseType<ReviewResponseType[]>, { userId: string }>({
            query: ({ userId }) => `${PathAPI.Review}/${userId}`,
        }),
        createReview: builder.mutation<ResponseType<ReviewResponseType>, CreateReviewType>({
            query: ({ title, category, rating, photo, body, tags, review_title, author_id, author_name }) => ({
                url: `${PathAPI.Review}`,
                method: 'POST',
                body: { title, category, rating, photo, body, tags, review_title, author_id, author_name },
            }),
        }),
    }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewAPI;
