import type { LoginData, SignupData } from '../types/auth';
import api from './api';

export const signup = async (data: SignupData) => {
  const response = await api.post('/auth/register', data);

  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', data);

  return response.data;
};