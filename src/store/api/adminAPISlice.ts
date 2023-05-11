import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PathAPI } from '../../enums/pathAPI';
import { ResponseType } from '../../types/ResponseType';
import { UserType } from '../../types/UserType';
import { TagType } from '../../enums/tagType';
import { Role } from '../../enums/role';

export const adminAPISlice = createApi({
    reducerPath: 'adminAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/',
        credentials: 'include',
    }),
    tagTypes: [TagType.User],
    endpoints: (builder) => ({
        getUsers: builder.query<ResponseType<UserType[]>, void>({
            query: () => `${PathAPI.GetUsers}`,
            providesTags: [TagType.User],
        }),
        changeAdminStatus: builder.mutation<ResponseType<UserType>, { userId: string; role: Role.Admin | Role.User }>({
            query: ({ userId, role }) => ({
                url: `${PathAPI.ChangeAdminStatus}`,
                method: 'PUT',
                body: { userId, role },
            }),
        }),
        changeIsBlockedStatus: builder.mutation<ResponseType<UserType>, { userId: string; status: boolean }>({
            query: ({ userId, status }) => ({
                url: `${PathAPI.ChangeIsBlockedStatus}`,
                method: 'PUT',
                body: { userId, status },
            }),
        }),
        deleteUser: builder.mutation<ResponseType<UserType>, { userId: string }>({
            query: ({ userId }) => ({
                url: `${PathAPI.DeleteUser}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TagType.User],
        }),
    }),
});

export const { useGetUsersQuery, useChangeAdminStatusMutation, useChangeIsBlockedStatusMutation, useDeleteUserMutation } =
    adminAPISlice;
