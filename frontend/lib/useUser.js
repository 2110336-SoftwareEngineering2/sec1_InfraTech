import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { COOKIE_NAME, API_HOST } from '../config/config';
import { REDIRECT_CONDITION } from '../config/RedirectCondition.config';

export default function useUser({
  redirectTo = null,
  redirectWhen = REDIRECT_CONDITION.USER_NOT_FOUND,
} = {}) {
  const [token, setCookie, removeCookie] = useCookies([COOKIE_NAME]);

  const { data: user = null, mutate: mutateUser } = useSWR(
    [`${API_HOST}/profile`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
        return res?.data ?? null;
      } catch (err) {
        removeCookie(COOKIE_NAME, { path: '/' });
        return null;
      }
    },
  );

  useEffect(() => {
    const redirectAsUserFound =
      token.letx_token && redirectWhen === REDIRECT_CONDITION.USER_FOUND;
    const redirectAsUserNotFound =
      !token.letx_token && redirectWhen === REDIRECT_CONDITION.USER_NOT_FOUND;

    if (redirectTo && (redirectAsUserNotFound || redirectAsUserFound)) {
      Router.push(redirectTo);
    }
  }, [user, redirectWhen, redirectTo]);

  return { user, mutateUser };
}
