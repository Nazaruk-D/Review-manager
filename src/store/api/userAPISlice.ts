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
        updateInfo: builder.mutation<ResponseType, { userId: string; newName?: string; image: File | null }>({
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
        }),
    }),
});

export const { useUpdateInfoMutation } = userAPISlice;
