import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { RegistrationType } from '../../types/RegistrationType';
import { LoginType } from '../../types/LoginType';
import { UserType } from '../../types/UserType';

export const authAPI = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        auth: builder.query<ResponseType<UserType>, Record<string, never>>({
            query: () => `${PathAPI.Auth}`,
        }),
        register: builder.mutation<ResponseType, RegistrationType>({
            query: ({ userName, email, password }) => ({
                url: `${PathAPI.Register}`,
                method: 'POST',
                body: { userName, email, password },
            }),
        }),
        login: builder.mutation<ResponseType<UserType>, LoginType>({
            query: ({ email, password }) => ({
                url: `${PathAPI.Login}`,
                method: 'POST',
                body: { email, password },
            }),
        }),
        logout: builder.mutation<ResponseType, Record<string, never>>({
            query: () => ({
                url: `${PathAPI.Logout}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useAuthQuery, useRegisterMutation, useLoginMutation, useLogoutMutation } = authAPI;
