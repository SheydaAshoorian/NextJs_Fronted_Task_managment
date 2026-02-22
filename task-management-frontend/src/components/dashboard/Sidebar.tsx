"use client";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  ListTodo, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">TaskFlow <span className="text-blue-400">ERP</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 px-4 mb-4 uppercase tracking-wider text-right">منوی اصلی</div>
        <NavItem icon={<LayoutDashboard size={20}/>} label="میز کار (داشبورد)" active />
        <NavItem icon={<ListTodo size={20}/>} label="مدیریت تسک‌ها" />
        <NavItem icon={<CheckCircle2 size={20}/>} label="گزارش‌های نهایی" />
        
        {user?.role === 'admin' && (
          <>
            <div className="text-xs font-semibold text-slate-500 px-4 mt-8 mb-4 uppercase tracking-wider text-right">مدیریت تیم</div>
            <NavItem icon={<Users size={20}/>} label="کاربران و دسترسی‌ها" />
            <NavItem icon={<Settings size={20}/>} label="تنظیمات سیستم" />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-[#1e293b]/50">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-rose-400 hover:bg-rose-500/10 w-full p-3 rounded-xl transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`
      flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 group
      ${active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
    `}>
      <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
        {icon}
      </span>
      <span className="font-medium text-[14px]">{label}</span>
      {active && <div className="mr-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
    </div>
  );
}