import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { REDIRECT_CONDITION } from '../config/RedirectCondition.config';

export default function useUser({
  redirectTo = null,
  redirectWhen = REDIRECT_CONDITION.USER_NOT_FOUND,
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
    const redirectAsUserFound =
      user?.firstname && redirectWhen === REDIRECT_CONDITION.USER_FOUND;
    const redirectAsUserNotFound =
      !user?.firstname && redirectWhen === REDIRECT_CONDITION.USER_NOT_FOUND;

    if (redirectTo && (redirectAsUserNotFound || redirectAsUserFound)) {
      Router.push(redirectTo);
    }
  }, [user, redirectWhen, redirectTo]);

  return { user, mutateUser };
}
