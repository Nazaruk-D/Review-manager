import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { AuthType } from '../../types/AuthType';
import { RegistrationType } from '../../types/RegistrationType';
import { LoginType } from '../../types/LoginType';

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
        register: builder.mutation<ResponseType, RegistrationType>({
            query: ({ firstName, lastName, email, password }) => ({
                url: `${PathAPI.Register}`,
                method: 'POST',
                body: { firstName, lastName, email, password },
            }),
        }),
    }),
});

export const { useAuthQuery, useRegisterMutation } = authAPI;
