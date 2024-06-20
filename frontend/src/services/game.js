import api from './api';

export const saveResult = async (data) => {
  try {
    const response = await api.post('/result', data);
    return response.data;
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
};
