"use client";
import { useEffect, useState } from 'react';
import { taskService } from '../../services/task.service'; 

export default function DashboardPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-600">داشبورد مدیریت تسک‌ها</h1>
      <div className="mt-5 p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">✅ ورود با موفقیت انجام شد.</p>
      </div>
      
    </div>
  );
}