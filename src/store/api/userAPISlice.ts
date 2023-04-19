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
        uploadPhoto: builder.mutation<ResponseType<any>, any>({
            query: (formData) => ({
                url: `${PathAPI.UploadPhoto}`,
                method: 'PUT',
                body: { formData },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
    }),
});

export const { useUploadPhotoMutation } = userAPISlice;
