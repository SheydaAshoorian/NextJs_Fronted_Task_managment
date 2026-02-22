"use client";
import { useState } from 'react'; // ۱. اضافه شد
import StatCard from '@/components/dashboard/StatCard';
import TaskTable from '@/components/dashboard/TaskTable';
import AddTaskModal from '@/components/dashboard/AddTaskModal'; // ۲. ایمپورت مودال
import { ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  // ۳. استیت برای باز و بسته شدن مودال
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ۴. استیت برای رفرش کردن جدول (با تغییر این عدد، جدول دوباره لود می‌شود)
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    setRefreshKey(prev => prev + 1); // جدول را مجبور به رفرش می‌کند
  };

  return (
    <div className="space-y-8">
      {/* بخش Header داخلی */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">میز کار من</h1>
          <p className="text-gray-500 text-sm mt-1">خلاصه وضعیت پروژه‌ها و تسک‌های امروز</p>
        </div>
        
        {/* ۵. وصل کردن دکمه به مودال */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          + تسک جدید
        </button>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="کل تسک‌ها" value="۲۴" icon={<ClipboardList size={22}/>} color="blue" description="ماه اخیر" />
        <StatCard title="در حال انجام" value="۸" icon={<Clock size={22}/>} color="orange" />
        <StatCard title="تکمیل شده" value="۱۲" icon={<CheckCircle size={22}/>} color="green" />
        <StatCard title="توقف شده" value="۴" icon={<AlertCircle size={22}/>} color="purple" />
      </div>

      {/* بخش جدول تسک‌ها */}
      <div className="grid grid-cols-1 gap-6">
        {/* ۶. اضافه کردن key برای آپدیت خودکار */}
        <TaskTable key={refreshKey} />
      </div>

      {/* ۷. فراخوانی خودِ مودال در انتهای صفحه */}
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
}