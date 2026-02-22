"use client";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // وارد کردن هوک

export default function LoginForm() {
  const { login, isLoading } = useAuth(); // وصل کردن هوک به کامپوننت
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // فراخوانی تابع لاگین از هوک
    await login({ email: formData.email, password: formData.password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="email" 
        placeholder="ایمیل"
        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required 
      />
      <input 
        type="password" 
        placeholder="رمز عبور"
        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required 
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
      >
        {isLoading ? 'در حال ورود...' : 'ورود به حساب'}
      </button>
    </form>
  );
}