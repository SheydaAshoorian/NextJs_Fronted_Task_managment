import api from '@/lib/api';
import { IUser } from '@/types/user';

export const UserService = {
  
  getAllUsers: async (): Promise<IUser[]> => {
    const response  = await api.get<any>('/users');

    
    return response.data.data;
  }
};