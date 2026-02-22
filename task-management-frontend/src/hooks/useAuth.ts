"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/auth.service'; 
import { useAuthStore } from '../store/auth.store';
import { LoginDto } from '../types/auth.types';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginStore = useAuthStore();
  const router = useRouter();

  const login = async (data: LoginDto) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(data);
      console.log("Login Success:", response);


      const token = response.access_token || response.data?.access_token;
      const user = response.user || response.data?.user;

      if (token) {
        loginStore.login(user, token);
        console.log("Token saved, redirecting...");
        router.push('/dashboard');
        router.refresh();   
      } else {
        console.error("Token not found in response structure:", response);
      }
      
    } catch (error: any) {

      console.error("Login Error Details:", error.response?.data || error.message);
      alert('ایمیل یا رمز عبور اشتباه است.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};