import api from './api';

export const login = (username, password) => {
  return api.post('/user/login', { username, password });
};

export const register = (username, email, password) => {
  return api.post('/user/register', { username, email, password });
};
