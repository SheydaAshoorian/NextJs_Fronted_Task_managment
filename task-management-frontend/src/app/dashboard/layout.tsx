// src/app/dashboard/layout.tsx
import { LayoutDashboard, CheckCircle2, ListTodo, Users, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold bg-slate-800">TaskFlow <span className="text-blue-400">ERP</span></div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="داشبورد" active />
          <NavItem icon={<ListTodo size={20}/>} label="تسک‌های من" />
          <NavItem icon={<CheckCircle2 size={20}/>} label="تکمیل شده" />
          <NavItem icon={<Users size={20}/>} label="تیم ما" />
          <div className="pt-4 mt-4 border-t border-slate-700">
            <NavItem icon={<Settings size={20}/>} label="تنظیمات" />
          </div>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 w-full p-2 rounded-lg transition">
            <LogOut size={20}/> خروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="text-gray-500">خوش آمدید، <span className="font-semibold text-gray-800">کاربر عزیز</span></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>
          </div>
        </header>
        
        {/* Page Content */}
        <section className="flex-1 overflow-y-auto p-8 text-gray-800">
          {children}
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}