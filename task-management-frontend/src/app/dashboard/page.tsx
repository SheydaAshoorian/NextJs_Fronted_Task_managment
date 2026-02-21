// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">خلاصه وضعیت پروژه</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="کل تسک‌ها" value="۲۴" change="+۱۲٪" color="bg-blue-500" />
        <StatCard title="در حال انجام" value="۷" change="بحرانی" color="bg-amber-500" />
        <StatCard title="تکمیل شده" value="۱۲" change="خوب" color="bg-emerald-500" />
        <StatCard title="به تعویق افتاده" value="۵" change="-۲٪" color="bg-rose-500" />
      </div>

      {/* Task Table Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">آخرین فعالیت‌ها</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ تسک جدید</button>
        </div>
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4">عنوان تسک</th>
              <th className="p-4">اولویت</th>
              <th className="p-4">وضعیت</th>
              <th className="p-4">مسئول</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <TableRow title="طراحی رابط کاربری ERP" priority="بالا" status="In Progress" color="text-amber-600" />
            <TableRow title="اتصال به دیتابیس NestJS" priority="بسیار بالا" status="Done" color="text-emerald-600" />
            <TableRow title="فیلترینگ پیشرفته تسک‌ها" priority="متوسط" status="Open" color="text-blue-600" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-2 h-full ${color}`}></div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      <span className="text-xs text-gray-400 mt-2 block">{change} نسبت به هفته قبل</span>
    </div>
  );
}

function TableRow({ title, priority, status, color }: any) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="p-4 font-medium">{title}</td>
      <td className="p-4 text-sm"><span className="bg-gray-100 px-2 py-1 rounded">{priority}</span></td>
      <td className={`p-4 text-sm font-bold ${color}`}>{status}</td>
      <td className="p-4 text-sm text-gray-500">شیدا آشوریان</td>
    </tr>
  );
}