"use client";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f8fafc] font-[vazirmatn]" dir="rtl">
      
      {/* کامپوننت سایدبار: مدیریت منوها و خروج */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* کامپوننت هدر: مدیریت پروفایل، جستجو و اعلان‌ها */}
        <Header />
        
        {/* بخش محتوای متغیر صفحات */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}