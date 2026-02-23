"use client";
import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Pencil } from 'lucide-react';

// تعریف تایپ برای ورودی‌های جدول
interface TaskTableProps {
  onEdit: (task: any) => void;
}

export default function TaskTable({ onEdit }: TaskTableProps) {
  // دریافت دیتا و توابع از هوک سفارشی
  const { tasks, loading, updateStatus } = useTasks();

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateStatus(taskId, newStatus);
    } catch (error) {
      console.error("خطا در آپدیت:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100 mt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 animate-pulse">در حال دریافت لیست تسک‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">آخرین فعالیت‌ها</h3>
        <button className="text-blue-600 text-xs font-semibold hover:underline">مشاهده همه</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-50/50 text-gray-400 text-[12px] uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold text-right">عنوان تسک</th>
              <th className="px-6 py-4 font-semibold text-center">مسئول</th>
              <th className="px-6 py-4 font-semibold text-center">وضعیت</th>
              <th className="px-6 py-4 font-semibold text-center">ددلاین</th>
              <th className="px-6 py-4 font-semibold text-center">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{task.title}</span>
                      <span className="text-[11px] text-gray-400 line-clamp-1">
                        {task.description || 'توضیحی ثبت نشده'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold border border-indigo-100">
                        {task.assignedTo?.first_name?.charAt(0) || '؟'}
                      </div>
                      <span className="text-xs text-gray-600">
                        {task.assignedTo ? `${task.assignedTo.first_name} ${task.assignedTo.last_name}` : 'بدون مسئول'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold border-none outline-none cursor-pointer transition-all ${
                        task.status === "done" ? "bg-emerald-50 text-emerald-600" :
                        task.status === "in_progress" ? "bg-blue-50 text-blue-600" : 
                        task.status === "ongit" ? "bg-purple-50 text-purple-600" : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      <option value="todo">در انتظار</option>
                      <option value="in_progress">در حال انجام</option>
                      <option value="done">تکمیل شده</option>
                      <option value="ongit">در گیت</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center text-xs text-gray-400 font-mono">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString('fa-IR') : '---'}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onEdit(task)} // استفاده از تابع پاس داده شده از صفحه پدر
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                      title="ویرایش تسک"
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400 text-sm">
                  در حال حاضر تسکی برای نمایش وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}