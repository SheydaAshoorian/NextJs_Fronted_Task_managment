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
  initialData?: any; 
}

export default function AddTaskModal({ isOpen, onClose, onTaskAdded, initialData }: Props) {
  const user = useAuthStore(state => state.user);

  // استیت‌های فرم
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState('todo');
  const [assignedToId, setAssignedToId] = useState<string>('');
  const [deadline, setDeadline] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);


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


      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setPriority(initialData.priority || 'medium');
        setStatus(initialData.status || 'todo');
        setAssignedToId(initialData.assignedTo?.id?.toString() || initialData.assignedToId?.toString() || '');

        setDeadline(initialData.deadline ? initialData.deadline.split('T')[0] : '');
      } else {

        resetForm();
      }
    }
  }, [isOpen, initialData]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignedToId('');
    setPriority('medium');
    setStatus('todo');
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setLoading(true);

    const taskPayload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assignedToId: Number(assignedToId),
      createdById: Number(user.id),
      deadline: deadline ? new Date(deadline).toISOString() : null
    };

    try {
      if (initialData?.id) {

        await TaskService.updateTask(initialData.id.toString(), taskPayload as any);
      } else {

        await TaskService.createTask(taskPayload as any);
      }
      
      onTaskAdded();
      onClose();
      resetForm();
    } catch (error: any) {
      alert("خطا: " + (error.response?.data?.message || "عملیات ناموفق"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-[vazir,tahoma]">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-black mb-6 text-slate-800 text-right flex items-center justify-end gap-2">
          {initialData ? '✏️ ویرایش فعالیت' : '✨ ایجاد فعالیت جدید'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 text-right" dir="rtl">
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">عنوان تسک</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-black transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">توضیحات</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-black h-24 resize-none transition-all"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">اولویت</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">باز (Todo)</option>
                <option value="in_progress">در جریان</option>
                <option value="done">انجام شده</option>
                <option value="ongit">در گیت</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 mr-1">موعد تحویل</label>
            <input 
              type="date" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              {loading ? 'در حال ثبت...' : (initialData ? 'ذخیره تغییرات' : 'تایید و ثبت فعالیت')}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}