import api from '@/lib/api'; 
import { ITask, CreateTaskDto, UpdateTaskDto } from '@/types/task.types';

export const TaskService = {
  // گرفتن همه تسک‌ها
  getAllTasks: async (id: number) => {
console.log('Sending request to server with ID:', id);
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  },

  // ساخت تسک جدید (با Dto مخصوص خودش)
  createTask: async (taskData: CreateTaskDto) => {
    const response = await api.post('/tasks', taskData);
    return response.data.data;
  },

  // آپدیت تسک (با Dto مخصوص خودش)
  updateTask: async (id: string, taskData: UpdateTaskDto) => {
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data.data;
  },

  // حذف تسک
  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  }
};