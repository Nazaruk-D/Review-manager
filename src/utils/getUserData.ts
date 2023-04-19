import { Dispatch } from '@reduxjs/toolkit';
import { supabase } from './supabase';
import { setLoggedIn, setUser } from '../store/slices/userSlice';
import { UserType } from '../types/UserType';

export async function getUserData(dispatch: Dispatch) {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
        console.error(authError);
        return;
    }
    if (authData?.user) {
        const { user } = authData;
        console.log('BEREM INFU OTSUDA?', user);
        const { data, error } = await supabase.from('users').select('*').eq('id', user.id);
        if (error) {
            console.error(error);
            return;
        }
        console.log('A NET, BEREM OTSUDA: ', data[0]);
        const newData: UserType = {
            email: user.email!,
            small_photo:
                user.user_metadata.avatar_url ||
                'https://sun1.velcom-by-minsk.userapi.com/impg/AN-ikCmTp9yLRpLCkoACsL5dMQC9PfxIv9sX-g/zJ5bKUy8JMk.jpg?size=1080x1920&quality=95&sign=0da9f7871dde6f0032cc304b2cd2dec7&type=album',
            main_photo: '',
            user_name: data[0].user_name,
            id: user.id,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            role: data[0].role,
        };
        dispatch(setUser(newData));
        dispatch(setLoggedIn(true));
    }
}
