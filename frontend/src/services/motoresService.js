import api from '../api';

export async function listMotores(date) {
  const query = date ? `?data=${date}` : '';
  const response = await api.get(`/motores${query}`);
  return response.data.data || [];
}

export async function createMotor(payload) {
  const response = await api.post('/motores', payload);
  return response.data.data;
}

export async function updateMotor(id, payload) {
  const response = await api.put(`/motores/${id}`, payload);
  return response.data.data;
}

export async function deleteMotor(id) {
  await api.delete(`/motores/${id}`);
}
