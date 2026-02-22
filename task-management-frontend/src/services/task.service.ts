import api from '@/lib/api'; 
import { ITask, CreateTaskDto, UpdateTaskDto } from '@/types/task.types';

export const TaskService = {

  getAllTasks: async (id: number) => {
    console.log('Sending request to server with ID:', id);
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  },


  createTask: async (taskData: CreateTaskDto) => {
    const response = await api.post('/tasks', taskData);
    return response.data.data;
  },


  updateTask: async (id: string, taskData: UpdateTaskDto) => {
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data.data;
  },


  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  }
};