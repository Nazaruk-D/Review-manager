import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { CommentType } from '../../types/CommentType';
import { CreateCommentType } from '../../types/CreateCommentType';

export const itemAPI = createApi({
    reducerPath: 'item',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getComments: builder.query<ResponseType<CommentType[]>, { reviewId: string }>({
            query: ({ reviewId }) => `${PathAPI.Comment}/${reviewId}`,
        }),
        getTags: builder.query<ResponseType<string[]>, Record<string, never>>({
            query: () => `${PathAPI.Tags}`,
        }),
        createComment: builder.mutation<ResponseType<CommentType>, CreateCommentType>({
            query: ({ review_id, author_id, body }) => ({
                url: `${PathAPI.Comment}`,
                method: 'POST',
                body: { review_id, author_id, body },
            }),
        }),
    }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useGetTagsQuery } = itemAPI;
