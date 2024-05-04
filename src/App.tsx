import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useState, useEffect } from 'react';
import { MantineProvider, Loader } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Router } from './Router';
import AuthWrapper from './components/AuthWrapper';
import { supabase } from './client';

export default function App() {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="top-center" />
      {initializing && (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader color="blue" />
        </div>
      )}
      {!initializing && (
        <>
          {!session && (
            <AuthWrapper>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]}
                theme="dark"
              />
            </AuthWrapper>
          )}
          {!!session && <Router />}
        </>
      )}
    </MantineProvider>
  );
}
