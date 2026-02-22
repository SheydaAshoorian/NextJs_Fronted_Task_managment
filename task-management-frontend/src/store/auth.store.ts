import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '../types/user.types';

// ۱. تعریف ساختار داده‌های استور
interface AuthState {
  user: IUser | null;
  access_token: string | null;
  isAuthenticated: boolean;
  
  // اکشن‌ها
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

// ۲. ساخت استور با قابلیت ماندگاری (Persist)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // مقدار اولیه
      user: null,
      access_token: null,
      isAuthenticated: false,

      /**
       * اکشن ورود: ذخیره اطلاعات کاربر و توکن
       */
      login: (user, token) => 
        set({ 
          user, 
          access_token: token, 
          isAuthenticated: true 
        }),

      /**
       * اکشن خروج: پاکسازی کامل وضعیت و حافظه مرورگر
       */
      logout: () => {
        // الف) پاک کردن دیتای موجود در حافظه زنده اپلیکیشن
        set({ 
          user: null, 
          access_token: null, 
          isAuthenticated: false 
        });

        // ب) پاک کردن فیزیکی دیتای ذخیره شده در مرورگر
        localStorage.removeItem('auth-storage');
        
        // ج) اختیاری: پاک کردن تمام کوکی‌ها یا استوریج‌های دیگر در صورت نیاز
        // localStorage.clear(); // اگر می‌خواهی همه چیز پاک شود این را فعال کن
      },
    }),
    {
      name: 'auth-storage', // نام کلید در LocalStorage مرورگر
      storage: createJSONStorage(() => localStorage),
    }
  )
);