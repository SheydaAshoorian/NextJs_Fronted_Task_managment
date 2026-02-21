import { 
  LayoutDashboard, 
  CheckCircle2, 
  ListTodo, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search 
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f8fafc] text-gray-800 font-[vazirmatn]">
      
      {/* --- Sidebar (سمت راست) --- */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">TaskFlow <span className="text-blue-400">ERP</span></span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 px-4 mb-4 uppercase tracking-wider">منوی اصلی</div>
          <NavItem icon={<LayoutDashboard size={20}/>} label="میز کار (داشبورد)" active />
          <NavItem icon={<ListTodo size={20}/>} label="مدیریت تسک‌ها" />
          <NavItem icon={<CheckCircle2 size={20}/>} label="گزارش‌های نهایی" />
          
          <div className="text-xs font-semibold text-slate-500 px-4 mt-8 mb-4 uppercase tracking-wider">مدیریت تیم</div>
          <NavItem icon={<Users size={20}/>} label="کاربران و دسترسی‌ها" />
          <NavItem icon={<Settings size={20}/>} label="تنظیمات سیستم" />
        </nav>

        <div className="p-4 border-t border-slate-800 bg-[#1e293b]/50">
          <button className="flex items-center gap-3 text-rose-400 hover:bg-rose-500/10 w-full p-3 rounded-xl transition-all duration-300 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content (بخش اصلی) --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header (هدر بالایی) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="relative w-96">
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="جستجو در تسک‌ها، پروژه‌ها..." 
              className="w-full pr-10 pl-4 py-2.5 bg-gray-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">شیدا آشوریان</p>
                <p className="text-[10px] text-gray-500 text-right">مدیر پروژه</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <span className="text-sm font-bold">SA</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Area (محل نمایش صفحات مختلف) */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// کامپوننت کمکی برای آیتم‌های منو
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