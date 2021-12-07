import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
import axios from './axios';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // Ajout du token x-xsrf-token dans le header de la requete HTTP
    // axios.defaults.headers['x-xsrf-token'] = xsrfToken;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
