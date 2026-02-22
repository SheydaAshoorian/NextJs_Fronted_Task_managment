import api from '@/lib/api'; 
import { LoginDto, LoginResponse } from '../types/auth.types';

interface IAuthService {

  login: (credentials: LoginDto) => Promise<LoginResponse>;
}

export const AuthService: IAuthService = {

  login: async (credentials: LoginDto) => {

    const { data } = await api.post<LoginResponse>('auth/login', credentials);
    return data;
  }
};