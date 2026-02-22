"use client";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`
      flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 group
      ${active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
    `}>
      <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
        {icon}
      </span>
      <span className="font-medium text-[14px]">{label}</span>
      {active && <div className="mr-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
    </div>
  );
}