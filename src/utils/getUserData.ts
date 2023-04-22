import { Dispatch } from '@reduxjs/toolkit';
import { supabase } from './supabase';
import { setLoggedIn, setUser } from '../store/slices/userSlice';
import { UserType } from '../types/UserType';
import { setInitialized } from '../store/slices/appSlice';

export async function getUserData(dispatch: Dispatch) {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
        console.error(authError);
        return;
    }
    if (authData?.user) {
        const { user } = authData;
        const { data, error } = await supabase.from('users').select('*').eq('id', user.id);
        if (error) {
            console.error(error);
            return;
        }
        console.log('BEREM OTSUDA: ', data[0]);
        const newData: UserType = {
            email: user.email!,
            small_photo: data[0].small_photo,
            main_photo: data[0].main_photo,
            user_name: data[0].user_name,
            id: user.id,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            role: data[0].role,
        };
        dispatch(setUser(newData));
        dispatch(setLoggedIn(true));
        dispatch(setInitialized());
    }
}
