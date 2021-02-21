import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { USER_TYPE } from '../config/UserType.config';
import { REDIRECT_CONDITION } from '../config/RedirectCondition.config';

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || 'letx_token';
const API_HOST =
  process.env.NEXT_PUBLIC_LETX_API_HOST || 'http://localhost:3001';

export default function useUser({
  redirectTo = null,
  redirectWhen = REDIRECT_CONDITION.USER_NOT_FOUND,
} = {}) {
  const [token] = useCookies([COOKIE_NAME]);

  const { data: user, mutate: mutateUser } = useSWR(
    [`${API_HOST}/profile`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      const { type = USER_TYPE.GUEST, profile = {} } = res.data;
      return {
        firstname: profile?.firstname ?? null,
        profileImageUrl: profile?.profileImageUrl ?? null,
        type: type.toUpperCase(),
      };
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
