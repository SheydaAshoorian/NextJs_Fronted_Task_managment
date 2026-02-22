"use client";

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm() {
  // ۱. تعریف استیت‌های محلی برای فیلدهای فرم
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // ۲. استفاده از هوک کاستوم (جدا کردن منطق از ظاهر)
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ۳. فراخوانی تابع لاگین از هوک
    // مقادیر اضافی مثل first_name صرفاً برای پاس کردن تایپ LoginDto هستند
    await login({ 
      email, 
      password,
      first_name: '', 
      last_name: '',
      role: 'user'
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ورود به مدیریت تسک‌ها
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 mt-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              در حال ورود...
            </span>
          ) : (
            "ورود به حساب"
          )}
        </button>
      </form>
    </div>
  );
}