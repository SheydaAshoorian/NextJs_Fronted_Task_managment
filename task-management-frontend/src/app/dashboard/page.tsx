'use client';

import { useEffect, useState } from 'react';
import { TaskService } from '@/services/task.service';
import { ITask } from '@/types/task';

export default function DashboardPage() {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true); // شروع بارگذاری
        const response = await TaskService.getAllTasks();
        
        console.log("دیتای دریافتی از بک‌اِند:", response);

      
        const actualTasks = Array.isArray(response) 
          ? response 
          : (response as any).data || [];

        setTasks(actualTasks);
      } catch (err: any) {
        console.error("خطا در لود تسک‌ها:", err);
        setError("خطا در دریافت اطلاعات از سرور");
        
        // اگر توکن منقضی شده بود
        if (err.response?.status === 401) {
          window.location.href = '/login';
        }
      } finally {
        setIsLoading(false); 
      }
    };

    loadTasks();
  }, []);


  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="mr-3 font-bold text-slate-600">در حال دریافت اطلاعات...</span>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">داشبورد مدیریت پروژه‌ها</h1>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
          تسک جدید +
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
            <tr>
              <th className="p-4 font-semibold">عنوان تسک</th>
              <th className="p-4 font-semibold">وضعیت</th>
              <th className="p-4 font-semibold">مسئول</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{task.title}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{task.assignee || 'نامشخص'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-400">
                  هیچ تسکی برای نمایش وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}