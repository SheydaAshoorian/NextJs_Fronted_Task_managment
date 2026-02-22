'use client';

import { useState , useEffect} from 'react';
import { TaskService } from '@/services/task.service';
import { UserService } from '@/services/user.service';
import { TaskPriority, CreateTaskDto } from '@/types/task';
import { IUser } from '@/types/user';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

export default function AddTaskModal({ isOpen, onClose, onTaskAdded }: Props) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [status, setStatus] = useState<'Todo' | 'In_Progress' | 'Done' | 'OnGit'>('Todo');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [assignedToId, setAssignedToId] = useState<number | string>('');
  const [deadline, setDeadline] = useState('');

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
    setLoading(true);

    // ساختن دیتای نهایی دقیقاً طبق  بک‌اِند (NestJS)
    const newTask = {
        title: title.trim(),
        description: description.trim(),
        priority: priority.toLowerCase(), 
        status: status.toLowerCase(), 
        assignedToId: Number(assignedToId),
        createdById: 18 ,
        deadline: deadline ? new Date(deadline).toISOString() : null // تبدیل تاریخ به فرمت استاندارد ISO
    };

    try {
      // استفاده از any برای دور زدن موقت تایپ‌اسکریپت تا از سد ارور ۴۰۰ بگذریم
      await TaskService.createTask(newTask as any); 
      
      onTaskAdded(); 
      onClose();     
      
      // ریست کردن فرم با مقادیر درست
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('Todo');
    } catch (error: any) {

      console.error("Server Error Payload:", error.response?.data);
      alert("خطا در ثبت: " + (error.response?.data?.message || "اطلاعات ارسالی ناقص است"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-[vazir,tahoma]">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 text-right">✨ ایجاد فعالیت جدید</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 text-right" dir="rtl">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان تسک</label>
            <input 
              type="text" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">توضیحات (اختیاری)</label>
            <textarea 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black h-28 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">مسئول انجام (Assignee)</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)} required >
              <option value="">انتخاب کاربر...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} 
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">اولویت</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                <option value="high">🔴 بالا</option>
                <option value="medium">🟡 متوسط</option>
                <option value="low">🟢 کم</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">وضعیت</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}>
                <option value="todo">باز</option>
                <option value="in_progress">در جریان</option>
                <option value="done">انجام شده</option>
                <option value="ongit">در گیت</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">موعد تحویل (Deadline)</label>
            <input 
              type="date" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading ? 'در حال ثبت...' : 'تایید و ثبت'}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 py-3.5 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}