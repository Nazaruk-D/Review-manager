import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { AuthType } from '../../types/AuthType';

export const authAPI = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        auth: builder.query<ResponseType<AuthType>, Record<string, never>>({
            query: () => `${PathAPI.Auth}`,
        }),
    }),
});

export const { useAuthQuery } = authAPI;
