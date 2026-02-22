"use client";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login({ email: formData.email, password: formData.password });
    } else {
      await register(formData, () => setIsLogin(true));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-[vazirmatn]" dir="rtl">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">
          {isLogin ? 'خوش آمدید 👋' : 'عضویت در سیستم 🚀'}
        </h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          {isLogin ? 'لطفاً وارد حساب کاربری خود شوید' : 'اطلاعات خود را برای ثبت‌نام وارد کنید'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <input 
                type="text" 
                placeholder="نام"
                className="p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder="نام خانوادگی"
                className="p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                required
              />
            </div>
          )}

          <input 
            type="email" 
            placeholder="ایمیل"
            className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <input 
            type="password" 
            placeholder="رمز عبور"
            className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'صبر کنید...' : (isLogin ? 'ورود' : 'ساخت حساب کاربری')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {isLogin ? 'هنوز ثبت‌نام نکردی؟ ' : 'قبلاً ثبت‌نام کردی؟ '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-bold hover:underline ml-1"
            >
              {isLogin ? 'ایجاد حساب جدید' : 'وارد شوید'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}