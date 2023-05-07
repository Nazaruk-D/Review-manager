import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { SendReviewType } from '../../types/SendReviewType';
import { TagType } from '../../enums/tagType';

export const reviewAPISlice = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: [TagType.Review, TagType.ReviewById],
    endpoints: (builder) => ({
        getReviews: builder.query<ResponseType<ReviewResponseType[]>, { userId: string }>({
            query: ({ userId }) => `${PathAPI.GetReview}/${userId}`,
            providesTags: [TagType.Review],
        }),
        getReviewById: builder.query<ResponseType<ReviewResponseType>, { reviewId: string }>({
            query: ({ reviewId }) => `${PathAPI.Review}/${reviewId}`,
            providesTags: [TagType.ReviewById],
        }),
        getLatestReviews: builder.query<ResponseType<ReviewResponseType[]>, Record<string, never>>({
            query: () => `${PathAPI.GetLatestReviews}`,
            providesTags: [TagType.Review],
        }),
        getPopularReviews: builder.query<ResponseType<ReviewResponseType[]>, Record<string, never>>({
            query: () => `${PathAPI.GetPopularReviews}`,
            providesTags: [TagType.Review],
        }),
        getPopularTags: builder.query<ResponseType<string[]>, Record<string, never>>({
            query: () => `${PathAPI.GetPopularTags}`,
        }),
        sendReview: builder.mutation<ResponseType<ReviewResponseType>, SendReviewType>({
            query: ({
                reviewId,
                title,
                category,
                assessment,
                uploadImage,
                body,
                tags,
                url,
                review_title,
                author_name,
                author_id,
            }) => {
                const formData = new FormData();
                formData.append('reviewId', reviewId);
                formData.append('author_id', author_id);
                formData.append('review_title', review_title);
                formData.append('title', title);
                formData.append('category', category);
                formData.append('body', body);
                formData.append('author_name', author_name);
                formData.append('assessment', assessment);
                if (tags) {
                    tags.forEach((tag) => {
                        formData.append('tags', tag);
                    });
                }
                if (uploadImage) {
                    uploadImage.forEach((file) => {
                        formData.append('reviewImage', file);
                    });
                }
                const fetchConfig: RequestInit = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                    },
                };
                return {
                    url: `${PathAPI.Review}/${url}`,
                    ...fetchConfig,
                };
            },
            invalidatesTags: [TagType.Review],
        }),
        deleteReviewById: builder.mutation<ResponseType, { reviewId: string }>({
            query: ({ reviewId }) => ({
                url: `${PathAPI.Review}`,
                method: 'DELETE',
                body: { reviewId },
            }),
            invalidatesTags: [TagType.Review, TagType.ReviewById],
        }),
        setRating: builder.mutation<ResponseType, { userId: string; reviewId: string; value: number }>({
            query: ({ userId, reviewId, value }) => ({
                url: `${PathAPI.Rating}`,
                method: 'POST',
                body: { userId, reviewId, value },
            }),
            invalidatesTags: [TagType.Review, TagType.ReviewById],
        }),
        setLike: builder.mutation<ResponseType, { userId: string; reviewId: string }>({
            query: ({ userId, reviewId }) => ({
                url: `${PathAPI.Like}`,
                method: 'POST',
                body: { userId, reviewId },
            }),
            invalidatesTags: [TagType.Review, TagType.ReviewById],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewByIdQuery,
    useSendReviewMutation,
    useGetLatestReviewsQuery,
    useGetPopularReviewsQuery,
    useGetPopularTagsQuery,
    useDeleteReviewByIdMutation,
    useSetRatingMutation,
    useSetLikeMutation,
} = reviewAPISlice;
