import api from './api';

export const createGame = () => {
  return api.post('/game/create');
};

export const submitResult = (result) => {
  return api.post('/result/submit', result);
};

export const getRanking = () => {
  return api.get('/result/ranking');
};
