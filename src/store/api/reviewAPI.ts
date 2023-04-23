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
            query: ({ title, category, rating, uploadImage, body, tags, review_title, author_id, author_name }) => {
                const formData = new FormData();
                formData.append('review_title', review_title);
                formData.append('title', title);
                formData.append('category', category);
                formData.append('body', body);
                formData.append('author_id', author_id);
                formData.append('author_name', author_name);
                formData.append('rating', rating);
                if (tags) {
                    tags.forEach((tag) => {
                        formData.append('tags', tag);
                    });
                }
                if (uploadImage) {
                    formData.append('reviewImage', uploadImage);
                }
                const fetchConfig: RequestInit = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                    },
                };
                return {
                    url: `${PathAPI.Review}`,
                    ...fetchConfig,
                };
            },
        }),
    }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewAPI;
