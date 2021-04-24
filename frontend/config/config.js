export const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || 'letx_token';
export const API_HOST =
  process.env.NEXT_PUBLIC_LETX_API_HOST || process.env.NODE_ENV === 'production'
    ? 'http://34.71.91.6:3001'
    : 'http://localhost:3001';
