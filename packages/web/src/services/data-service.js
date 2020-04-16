import api from './api';

export const fetchAllTodos = async () => {
  const response = await api.get('/todo/getAll');
  return response.data;
}