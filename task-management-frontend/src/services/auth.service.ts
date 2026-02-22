import api from '@/lib/api'; 
import { LoginDto, LoginResponse, RegisterDto, AuthResponse } from '@/types/auth.types';

interface IAuthService {

  login: (credentials: LoginDto) => Promise<LoginResponse>;
}

export const AuthService = {
  
  login: async (credentials: any) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },


  
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

};