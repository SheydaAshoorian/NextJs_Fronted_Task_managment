import api from '@/lib/api'; 
import { ITask } from '@/types/task.types';


export const TaskService = {

  /**
   * دریافت لیست تسک‌ها
   *  http://localhost:3001/api/v1/tasks
   */
  getAllTasks: async () => {
    const response = await api.get<ITask[]>('/tasks');
    return response.data;
  },

  /**
   * ایجاد تسک جدید
   */
  createTask: async (taskData: Partial<ITask>) => {
    const response = await api.post<ITask>('/tasks', taskData);
    return response.data;
  },
  
  /**
   * حذف تسک
   */
  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  }
};