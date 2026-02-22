"use client";
import StatCard from '@/components/dashboard/StatCard';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* بخش خوش‌آمدگویی */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">میز کار من</h1>
        <p className="text-gray-500 text-sm mt-1">خلاصه وضعیت پروژه‌ها و تسک‌های امروز</p>
      </div>

      {/* شبکه کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="کل تسک‌ها" 
          value="۲۴" 
          icon={<ClipboardList size={24} />} 
          color="blue"
          description="نسبت به ماه قبل"
        />
        <StatCard 
          title="در حال انجام" 
          value="۸" 
          icon={<Clock size={24} />} 
          color="orange"
        />
        <StatCard 
          title="تکمیل شده" 
          value="۱۲" 
          icon={<CheckCircle size={24} />} 
          color="green"
        />
        <StatCard 
          title="توقف شده" 
          value="۴" 
          icon={<AlertCircle size={24} />} 
          color="purple"
        />
      </div>

      {/* اینجا در آینده لیست تسک‌ها یا نمودارها قرار می‌گیرند */}
      <div className="bg-white p-8 rounded-3xl border border-dashed border-gray-200 h-64 flex items-center justify-center">
        <p className="text-gray-400 italic text-sm">بخش نمودارها و فعالیت‌های اخیر به‌زودی اضافه می‌شود...</p>
      </div>
    </div>
  );
}