"use client";
import { useEffect, useState } from 'react';
import { TaskService } from '@/services/task.service';
import { ITask } from '@/types/task.types';
import { useAuthStore } from '@/store/auth.store';

export default function TaskTable() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  // گرفتن دیتای کاربر از استور
  const user = useAuthStore(state => state.user);
  const userId = user?.id;

  // تابع تغییر وضعیت تسک
  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      // ۱. آپدیت در سمت سرور (تبدیل آیدی تسک به عدد اگر لازم است)
      await TaskService.updateTask(taskId, { status: newStatus as any });
      
      // ۲. آپدیت سریع در استیت محلی
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === taskId ? { ...t, status: newStatus as any } : t)
      );
      
      console.log(`وضعیت تسک ${taskId} به ${newStatus} تغییر یافت`);
    } catch (error) {
      console.error("خطا در بروزرسانی وضعیت:", error);
      alert("مشکلی در تغییر وضعیت پیش آمد");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      // تبدیل به عدد برای جلوگیری از NaN
      const currentId = Number(userId);

      // اگر آیدی هنوز لود نشده یا معتبر نیست، درخواست نزن
      if (!userId || isNaN(currentId)) {
        return;
      }

      try {
        setLoading(true);
        const data = await TaskService.getAllTasks(currentId);
        setTasks(data);
      } catch (error) {
        console.error("خطا در دریافت تسک‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]); // وابستگی به userId برای اجرای مجدد پس از لود شدن کاربر

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100 mt-6">
        <div className="animate-pulse text-gray-400">در حال بارگذاری تسک‌ها...</div>
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
              <th className="px-6 py-4 font-semibold">عنوان تسک</th>
              <th className="px-6 py-4 font-semibold text-center">مسئول</th>
              <th className="px-6 py-4 font-semibold text-center">وضعیت</th>
              <th className="px-6 py-4 font-semibold text-center">ددلاین  </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* ستون عنوان */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{task.title}</span>
                      <span className="text-[11px] text-gray-400 line-clamp-1">{task.description || 'بدون توضیح'}</span>
                    </div>
                  </td>

                  {/* ستون مسئول */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold border border-indigo-100">
                        {task.assignedTo?.first_name?.charAt(0) || '؟'}
                      </div>
                      <span className="text-xs text-gray-600">
                        {task.assignedTo ? `${task.assignedTo.first_name} ${task.assignedTo.last_name}` : 'نامشخص'}
                      </span>
                    </div>
                  </td>

                  {/* ستون وضعیت (دراپ‌دان) */}
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

                  {/* ستون تاریخ */}
                  <td className="px-6 py-4 text-center text-xs text-gray-400 font-mono">
                    {task.deadline ? 
                      new Date(task.deadline).toLocaleDateString('fa-IR') : '---'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400 text-sm">
                  تسکی برای نمایش یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}