export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'Todo' | 'In_Progress' | 'Done' | 'OnGit';

// ۱. ساختار اصلی که از API می‌گیریم (مطابق Entity)
export interface ITask {
  id: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedToId: number;
  assignedTo?: IUser; 
  deadline: string;
  createdAt?: string;
}

// ۲. ساختار برای ارسال دیتا (مطابق CreateDto)
// با استفاده از Omit می‌گوییم "همه فیلدهای بالا به جز id و createdAt"
export type CreateTaskDto = Omit<ITask, 'id' | 'createdAt'>;


// ۳. آپدیت
export type UpdateTaskDto = Partial<CreateTaskDto>;