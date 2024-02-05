import { jwtDecode } from 'jwt-decode';

// TODO: add token key to config or .env
const TOKEN_KEY = 'koc-jwt';

export const getBearerToken = () => {
  try {
    return JSON.parse(localStorage?.getItem(TOKEN_KEY)!);
  } catch (e) {
    return null;
  }
};

export const setBearerToken = (token: string) => {
  localStorage?.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const removeBearerToken = () => {
  localStorage?.removeItem(TOKEN_KEY);
};

export const validateBearerToken = (token: string, userAddress?: string) => {
  try {
    const decoded = jwtDecode(token);

    return (decoded?.exp || Date.now()) < Date.now() && decoded?.sub === userAddress;
  } catch (e) {
    return false;
  }
};
