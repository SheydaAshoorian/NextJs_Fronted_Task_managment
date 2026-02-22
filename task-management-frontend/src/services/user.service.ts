import api from '@/lib/api';
import { IUser } from '@/types/user';

export const UserService = {
  getAllUsers: async (): Promise<IUser[]> => {
    const { data } = await api.get<any>('/users');
    // هندل کردن ساختار دیتای بک‌اِند 
    return Array.isArray(data) ? data : data.data || [];
  }
};