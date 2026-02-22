"use client";

import { useState, useEffect } from 'react';
import { TaskService } from '@/services/task.service';
import { ITask } from '@/types/task.types';
import { useAuthStore } from '@/store/auth.store';

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  const fetchTasks = async () => {
    const userId = Number(user?.id);
    if (!userId || isNaN(userId)) return;

    try {
      setLoading(true);
      const data = await TaskService.getAllTasks(userId);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    try {
      await TaskService.updateTask(taskId, { status: newStatus as any });
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as any } : t));
    } catch (error) {
      throw error; // اجازه بده کامپوننت در صورت نیاز با alert واکنش نشون بده
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  return { tasks, loading, updateStatus, refreshTasks: fetchTasks };
};