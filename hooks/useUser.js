// hooks/useUser.js
import { useEffect, useState } from 'react';
import api from '@/app/utils/api';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
        console.log('User data:', response.data); // Dodaj to logowanie
      } catch (error) {
        console.error('Failed to fetch user', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}