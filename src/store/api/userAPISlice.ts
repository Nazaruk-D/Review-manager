import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { UserType } from '../../types/UserType';
import { TagType } from '../../enums/tagType';

export const userAPISlice = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    tagTypes: [TagType.User],
    endpoints: (builder) => ({
        getUsers: builder.query<ResponseType<UserType[]>, void>({
            query: () => `${PathAPI.GetUsers}`,
        }),
        getUser: builder.query<ResponseType<UserType>, { userId: string }>({
            query: ({ userId }) => `${PathAPI.GetUser}/${userId}`,
            providesTags: [TagType.User],
        }),
        updateInfo: builder.mutation<
            ResponseType<{ newName: string; newPhoto?: string }>,
            { userId: string; newName?: string; image: File | null }
        >({
            query: ({ userId, newName, image }) => {
                const formData = new FormData();
                formData.append('userId', userId);
                if (newName) {
                    formData.append('newName', newName);
                }
                if (image) {
                    formData.append('profilePhoto', image);
                }
                const fetchConfig: RequestInit = {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                    },
                };
                return {
                    url: `${PathAPI.UploadPhoto}`,
                    ...fetchConfig,
                };
            },
            invalidatesTags: [TagType.User],
        }),
    }),
});

export const { useUpdateInfoMutation, useGetUsersQuery, useGetUserQuery } = userAPISlice;
