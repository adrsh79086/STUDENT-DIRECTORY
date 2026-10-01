import axios from 'axios';
import type { LoginData, SignupData } from '../types/auth';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const signup = async (data: SignupData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    data
  );

  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    data
  );

  return response.data;
};