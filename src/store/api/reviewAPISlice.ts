import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { CreateReviewType } from '../../types/CreateReviewType';
import { TagType } from '../../enums/tagType';

export const reviewAPISlice = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
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
        getPopularTags: builder.query<ResponseType<string[]>, Record<string, never>>({
            query: () => `${PathAPI.GetPopularTags}`,
        }),
        createReview: builder.mutation<ResponseType<ReviewResponseType>, CreateReviewType>({
            query: ({ title, category, assessment, uploadImage, body, tags, review_title, author_id, author_name }) => {
                const formData = new FormData();
                formData.append('review_title', review_title);
                formData.append('title', title);
                formData.append('category', category);
                formData.append('body', body);
                formData.append('author_id', author_id);
                formData.append('author_name', author_name);
                formData.append('rating', assessment);
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
    useCreateReviewMutation,
    useGetLatestReviewsQuery,
    useGetPopularTagsQuery,
    useSetRatingMutation,
    useSetLikeMutation,
} = reviewAPISlice;
