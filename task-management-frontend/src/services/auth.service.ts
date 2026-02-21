import api from '@/lib/api';
import { LoginResponse } from '@/types/auth';


export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {

    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    return data;
  }
};