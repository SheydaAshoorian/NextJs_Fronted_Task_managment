"use client";
import { useEffect, useState } from 'react';
import { TaskService } from '@/services/task.service';
import { ITask } from '@/types/task.types';

export default function TaskTable() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await TaskService.getAllTasks();
        setTasks(data.data);
      } catch (error) {
        console.error("خطا در دریافت تسک‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-400">در حال بارگذاری تسک‌ها...</div>;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">آخرین فعالیت‌ها</h3>
        <button className="text-blue-600 text-xs font-semibold hover:underline">مشاهده همه</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          {/* بخش گمشده: هدر جدول */}
          <thead className="bg-gray-50/50 text-gray-400 text-[12px] uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">عنوان تسک</th>
              <th className="px-6 py-4 font-semibold text-center">وضعیت</th>
              <th className="px-6 py-4 font-semibold text-center">اولویت</th>
              <th className="px-6 py-4 font-semibold text-center">تاریخ ایجاد</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
              {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition-colors text-right">
                  {/* ستون عنوان */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{task.title}</span>
                      <span className="text-[11px] text-gray-400 line-clamp-1">{task.description}</span>
                    </div>
                  </td>

                  {/* ستون مسئول (Assigned To) */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {task.assignedTo?.first_name?.charAt(0) || '؟'}
                      </div>
                      <span className="text-xs text-gray-600">
                        {task.assignedTo ? `${task.assignedTo.first_name} ${task.assignedTo.last_name}` : 'بدون مسئول'}
                      </span>
                    </div>
                  </td>

                  {/* ستون وضعیت */}
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      task.status === "Done" ? "bg-emerald-50 text-emerald-600" :
                      task.status === "In_Progress" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                    }`}>
                      {task.status === "Done" ? "تکمیل شده" : 
                      task.status === "In_Progress" ? "در حال انجام" : "در انتظار"}
                    </span>
                  </td>

                  {/* ستون تاریخ ایجاد */}
                  <td className="px-6 py-4 text-center text-sm text-gray-500 font-mono">
                    {task.createdAt ? 
                      new Date(task.createdAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }) : '---'}
                  </td>
                </tr>
              ))
            ) : (
          <tr>
            <td colSpan={4} className="p-10 text-center text-gray-400">تسکـی یافت نشد.</td>
          </tr>
        )}
      </tbody>
        </table>
      </div>
    </div>
  );
}