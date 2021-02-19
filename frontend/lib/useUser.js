import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const [token] = useCookies([process.env.NEXT_PUBLIC_COOKIE_NAME]);

  const { data: user, mutate: mutateUser } = useSWR(
    ['/api/user', token],
    async (url, token) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${
            token[process.env.NEXT_PUBLIC_COOKIE_NAME] || ''
          }`,
        },
      });
      return res.data;
    },
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    // if (!redirectTo || !user) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
