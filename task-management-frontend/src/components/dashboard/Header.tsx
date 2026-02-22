"use client";
import { useAuthStore } from '@/store/auth.store';
import { Bell, Search } from 'lucide-react';
import { getRoleLabel } from '@/lib/utils'; 

export default function Header() {
    
  const user = useAuthStore((state) => state.user);

  // چسباندن نام و نام خانوادگی
  const fullName = user?.first_name || user?.last_name 
    ? `${user.first_name} ${user.last_name}` 
    : 'کاربر سیستم';

  // گرفتن حروف اول برای آواتار
  const initials = user?.first_name && user?.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : 'US';

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-40">
      {/* بخش جستجو */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          placeholder="جستجو در تسک‌ها..." 
          className="w-full pr-10 pl-4 py-2.5 bg-gray-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-right"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
          <Bell size={22} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
              {fullName}
            </p>
            <p className="text-[10px] text-gray-500">
              {getRoleLabel(user?.role)}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <span className="text-sm font-bold">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
}