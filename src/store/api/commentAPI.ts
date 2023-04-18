import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { CommentType } from '../../types/CommentType';
import { CreateCommentType } from '../../types/CreateCommentType';

export const commentAPI = createApi({
    reducerPath: 'comment',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getComments: builder.query<ResponseType<CommentType[]>, { reviewId: string }>({
            query: ({ reviewId }) => `${PathAPI.Comment}/${reviewId}`,
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

export const { useGetCommentsQuery, useCreateCommentMutation } = commentAPI;
