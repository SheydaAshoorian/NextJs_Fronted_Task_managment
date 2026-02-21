import api from '@/lib/api';
import { LoginResponse } from '@/types/auth';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // استفاده از Generic برای تایپ‌دهی به خروجی API
    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    return data;
  },
};