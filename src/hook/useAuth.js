import { useState, useEffect } from 'react';
import { Hub, Auth } from 'aws-amplify';

export function useAuth() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    Hub.listen('auth', async (data) => {
      const { payload } = data;
      if (payload.event === 'signIn' || payload.event === 'signOut') {
        // Because I'm not certain that signIn / signOut event necessarily
        // imply the current user:
        try {
          await Auth.currentAuthenticatedUser();
          setAuthenticated(true);
        } catch (e) {
          setAuthenticated(false);
        }
      }
    });

    Auth.currentAuthenticatedUser().then(() => {
      // If promise resolves, we are authenticated
      setAuthenticated(true);
    }).catch(() => {
      setAuthenticated(false);
    });
  }, []);

  return isAuthenticated;
}
