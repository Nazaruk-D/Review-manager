import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { CommentType } from '../../types/CommentType';
import { ReviewResponseType } from '../../types/ReviewResponseType';

export const itemAPI = createApi({
    reducerPath: 'item',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
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
    useGetSearchResultQuery,
} = itemAPI;
