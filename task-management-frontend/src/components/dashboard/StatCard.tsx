"use client";
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "blue" | "green" | "orange" | "purple";
  description?: string;
}

export default function StatCard({ title, value, icon, color, description }: StatCardProps) {
  // نقشه‌ی رنگ‌ها برای مدیریت راحت‌تر استایل
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
          {description && (
            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
              <span className="text-emerald-500 font-bold">↑ 12%</span> {description}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-2xl border ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}