"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/auth.service'; 
import { useAuthStore } from '../store/auth.store';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginStore = useAuthStore();
  const router = useRouter();

  // تابع لاگین
  const login = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(data);
      const token = response.access_token || response.data?.access_token;
      const user = response.user || response.data?.user;

      if (token) {
        loginStore.login(user, token); // ذخیره در Zustand
        router.push('/dashboard');
        router.refresh();   
      }
    } catch (error: any) {
      alert('ایمیل یا رمز عبور اشتباه است.');
    } finally {
      setIsLoading(false);
    }
  };

  // تابع ثبت‌نام (جدید)
  const register = async (data: any, onSuccess: () => void) => {
    setIsLoading(true);
    try {
      await AuthService.register(data);
      alert("ثبت‌نام موفقیت‌آمیز بود! حالا وارد شوید.");
      onSuccess(); // تغییر وضعیت به فرم لاگین
    } catch (error: any) {
      alert(error.response?.data?.message || "خطا در ثبت‌نام");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading };
};