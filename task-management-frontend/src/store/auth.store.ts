import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '../types/user.types';

// ۱. تعریف شکلِ داده‌ها در استور
interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  // اکشن‌ها (توابعی که استیت را تغییر می‌دهند)
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

// ۲. این قابلیتِ زاستند باعث می‌شود که وقتی کاربر صفحه را رفرش می‌کند،
//  اطلاعات لاگین (مثل توکن) از بین نرود و به صورت خودکار از localStorage بازخوانی شود.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // وقتی لاگین موفق بود، این تابع را صدا می‌زنیم
      login: (user, token) => 
        set({ 
          user, 
          token, 
          isAuthenticated: true 
        }),

      // برای خروج کاربر
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        // اینجا می‌توانید LocalStorage را هم اگر لازم بود دستی پاک کنید، 
        // هرچند خودِ persist این کار را انجام می‌دهد.
      },
    }),
    {
      name: 'auth-storage', // نام کلید در LocalStorage
      storage: createJSONStorage(() => localStorage), // انتخاب محل ذخیره (پیش‌فرض localStorage)
    }
  )
);