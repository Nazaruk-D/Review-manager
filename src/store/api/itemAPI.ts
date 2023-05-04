import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { CommentType } from '../../types/CommentType';
import { CreateCommentType } from '../../types/CreateCommentType';
import { ReviewResponseType } from '../../types/ReviewResponseType';

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
        getSearchResult: builder.query<ResponseType<ReviewResponseType[]>, { searchValue: string }>({
            query: ({ searchValue }) => `${PathAPI.Search}/${searchValue}`,
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useGetTagsQuery,
    useLazyGetSearchResultQuery,
    useGetSearchResultQuery,
} = itemAPI;
