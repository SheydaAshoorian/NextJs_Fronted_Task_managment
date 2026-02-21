// در فایل src/types/task.ts (اگر نساختی بساز)
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignee: string;
}