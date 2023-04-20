import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';

export const userAPISlice = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        updateInfo: builder.mutation<ResponseType, { newName: string; profilePhoto: File | null }>({
            query: ({ newName, profilePhoto }) => {
                const formData = new FormData();
                formData.append('newName', newName);
                if (profilePhoto) {
                    formData.append('profilePhoto', profilePhoto);
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
        }),
    }),
});

export const { useUpdateInfoMutation } = userAPISlice;
