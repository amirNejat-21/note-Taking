import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getNotes = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const createNote = async (title: string, content: string) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, { title, body: content });
  return response.data;
};

export const updateNote = async (id: number, title: string, content: string) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, { id, title, body: content });
  return response.data;
};

export const deleteNote = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
};