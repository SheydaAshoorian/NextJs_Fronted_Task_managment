import api from '@/lib/api';
import { ITask, CreateTaskDto } from '@/types/task';

export const TaskService = {

    getAllTasks: async (): Promise<ITask[]> => {
    const { data } = await api.get<ITask[]>('/tasks');
    return data;
  },

  createTask: async (taskData: CreateTaskDto): Promise<ITask> => {
    const { data } = await api.post<ITask>('/tasks', taskData);
    return data;
  },



  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};