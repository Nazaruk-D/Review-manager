import { Dispatch } from '@reduxjs/toolkit';
import { supabase } from './supabase';
import { setLoggedIn, setUser } from '../store/slices/userSlice';
import { UserType } from '../types/UserType';
import { setAppErrorAC } from '../store/slices/appSlice';

export async function getUserData(dispatch: Dispatch) {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
        return;
    }

    if (authData?.user) {
        const { user } = authData;
        const { data, error } = await supabase.from('users').select('*').eq('id', user.id);

        if (error) {
            dispatch(setAppErrorAC('Error auth'));
            return;
        }

        const newData: UserType = {
            email: user.email!,
            small_photo: data[0].small_photo,
            main_photo: data[0].main_photo,
            user_name: data[0].user_name,
            role: data[0].role,
            is_blocked: data[0].is_blocked,
            id: user.id,
            totalLikes: data[0].totalLikes,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        dispatch(setUser(newData));
        dispatch(setLoggedIn(true));
    }
}
