export const getRoleLabel = (role: string | undefined) => {
  const lowerRole = role?.toLowerCase();
  switch (lowerRole) {
    case 'admin':
      return 'مدیر سیستم';
    case 'user':
      return 'کارشناس پروژه';
    case 'manager':
      return 'مدیر بخش';
    default:
      return role || 'کاربر';
  }
};

/**
 * تابعی برای گرفتن حروف اول نام و نام خانوادگی
 */
export const getInitials = (firstـname?: string, last_name?: string) => {
  if (!first_name && !last_name) return 'US';
  const first = first_name?.charAt(0) || '';
  const last = last_name?.charAt(0) || '';
  return (first + last).toUpperCase();
};