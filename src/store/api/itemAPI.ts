import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { CommentType } from '../../types/CommentType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { TagType } from '../../enums/tagType';
import { TagsCloudType } from '../../types/TagsCloudType';

export const itemAPI = createApi({
    reducerPath: 'item',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: [TagType.Comment],
    endpoints: (builder) => ({
        getComments: builder.query<ResponseType<CommentType[]>, { reviewId: string }>({
            query: ({ reviewId }) => `${PathAPI.Comment}/${reviewId}`,
            providesTags: [TagType.Comment],
        }),
        getTags: builder.query<ResponseType<TagsCloudType[]>, Record<string, never>>({
            query: () => `${PathAPI.Tags}`,
        }),
        getSearchResult: builder.query<ResponseType<ReviewResponseType[]>, { searchValue: string }>({
            query: ({ searchValue }) => `${PathAPI.Search}/${searchValue}`,
        }),
        deleteComment: builder.mutation<ResponseType<CommentType[]>, { id: string }>({
            query: ({ id }) => ({
                url: `${PathAPI.Comment}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TagType.Comment],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useGetTagsQuery,
    useGetSearchResultQuery,
    useDeleteCommentMutation,
} = itemAPI;
