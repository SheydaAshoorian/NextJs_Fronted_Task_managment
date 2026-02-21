'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    console.log("تلاش برای لاگین با:", email); 

    try {

      const response = await authService.login(email, password);
      console.log("پاسخ کامل:", response);


      const token = response.data?.access_token;
            
      if (token) {
        console.log("توکن پیدا شد، ذخیره و انتقال...");
        localStorage.setItem('token', token);
        

        router.push('/dashboard');
        
      } else {
        console.error("توکن در فیلد data پیدا نشد! پاسخ را چک کنید.");
      }
    } catch (error: any) {
      alert("خطا: یا ایمیل اشتباهه یا سرور بک‌اِند خاموشه!");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ورود به مدیریت تسک‌ها</h2>
      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="ایمیل (sheydaashoorian@gmail.com)"
            className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="رمز عبور"
            className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit" 
          className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          ورود
        </button>
      </form>
    </div>
  );
}