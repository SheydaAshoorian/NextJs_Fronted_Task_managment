"use client";
import StatCard from '@/components/dashboard/StatCard';
import TaskTable from '@/components/dashboard/TaskTable'; // ایمپورت جدول
import { ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* بخش Header داخلی */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">میز کار من</h1>
          <p className="text-gray-500 text-sm mt-1">خلاصه وضعیت پروژه‌ها و تسک‌های امروز</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
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
        <TaskTable />
      </div>
    </div>
  );
}