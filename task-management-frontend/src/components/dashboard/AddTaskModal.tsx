"use client";

import { useState, useEffect } from 'react';
import { TaskService } from '@/services/task.service';
import { UserService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth.store';
import { TaskPriority } from '@/types/task';
import { IUser } from '@/types/user';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

export default function AddTaskModal({ isOpen, onClose, onTaskAdded }: Props) {
  // ۱. استخراج اطلاعات کاربر لاگین شده برای تعیین سازنده تسک
  const user = useAuthStore(state => state.user);

  // ۲. استیت‌های فرم (با مقادیر اولیه هماهنگ با بک‌اِند)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState('todo');
  const [assignedToId, setAssignedToId] = useState<string>('');
  const [deadline, setDeadline] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  // دریافت لیست کاربران برای دراپ‌دان مسئول
  useEffect(() => {
    if (isOpen) {
      const loadUsers = async () => {
        try {
          const data = await UserService.getAllUsers();
          setUsers(data);
        } catch (err) {
          console.error("خطا در دریافت کاربران:", err);
        }
      };
      loadUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    setLoading(true);

    // ۳. آماده‌سازی پکیج دیتا دقیقاً مطابق انتظار NestJS و دیتابیس
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      priority: priority, // مقدار از پیش کوچک شده
      status: status,     // مقدار از پیش کوچک شده
      assignedToId: Number(assignedToId),
      createdById: Number(user.id), // آیدی کاربر لاگین شده
      deadline: deadline ? new Date(deadline).toISOString() : null
    };

    try {
      // ارسال به سرویس
      await TaskService.createTask(newTask as any); 
      
      // موفقیت‌آمیز: ریست فرم و اطلاع به والد
      setTitle('');
      setDescription('');
      setDeadline('');
      setAssignedToId('');
      setPriority('medium');
      setStatus('todo');
      
      onTaskAdded(); // رفرش جدول
      onClose();     // بستن مودال
      
    } catch (error: any) {
      console.error("خطای ارسالی به سرور:", error.response?.data);
      alert("خطا در ثبت تسک: " + (error.response?.data?.message || "اطلاعات ناقص است"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-[vazir,tahoma]">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-black mb-6 text-slate-800 text-right flex items-center justify-end gap-2">
          ✨ ایجاد فعالیت جدید
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 text-right" dir="rtl">
          {/* عنوان */}
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">عنوان تسک</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-black transition-all"
              placeholder="مثلاً: طراحی صفحه لاگین"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* توضیحات */}
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">توضیحات</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-black h-24 resize-none transition-all"
              placeholder="جزئیات تسک را اینجا بنویسید..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* انتخاب مسئول */}
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">مسئول انجام</label>
            <select 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-pointer"
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)} 
              required
            >
              <option value="">انتخاب از لیست همکاران...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name} {u.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* اولویت و وضعیت در یک ردیف */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">اولویت</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                <option value="high">🔴 بالا</option>
                <option value="medium">🟡 متوسط</option>
                <option value="low">🟢 کم</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">وضعیت</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">باز (Todo)</option>
                <option value="in_progress">در جریان</option>
                <option value="done">انجام شده</option>
                <option value="ongit">در گیت</option>
              </select>
            </div>
          </div>

          {/* ددلاین */}
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">موعد تحویل (Deadline)</label>
            <input 
              type="date" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          {/* دکمه‌های عملیاتی */}
          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95"
            >
              {loading ? 'در حال ثبت...' : 'تایید و ثبت فعالیت'}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}