import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../../enums/path';

const supabase = createClient(
    'https://aprlrxbbzpblszqgsegy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmxyeGJienBibHN6cWdzZWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NjUxNzUsImV4cCI6MTk5NzA0MTE3NX0.L465Hij8NrxrRe0aUgWz8IsZyd-mNjE-E1xrnggaSmE',
);

const Success = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                console.log(value.data.user);
                if (value.data?.user) {
                    setUser(value.data.user);
                }
            });
        }
        getUserData();
    }, []);

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        navigate(Path.Login);
    }

    return (
        <div>
            {Object.keys(user).length !== 0 ? (
                <>
                    <div>Success</div>
                    <button onClick={signOutUser}>Sign out</button>
                </>
            ) : (
                <>
                    <h1>User is not logged in</h1>
                    <button onClick={() => navigate(Path.Login)}>Go to login page</button>
                </>
            )}
        </div>
    );
};

export default Success;
