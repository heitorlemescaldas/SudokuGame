/*
import api from './api';

export const login = (username, password) => {
  return api.post('/user/login', { username, password });
};

export const register = (username, email, password) => {
  return api.post('/user/register', { username, email, password });
};
*/

import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/user/login', { username, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post('/user/register', { username, email, password });
  return response.data;
};

