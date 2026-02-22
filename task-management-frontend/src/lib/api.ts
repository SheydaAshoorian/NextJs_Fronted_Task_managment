
//وظیفه‌اش این است که مثل یک «بازرس»،
//  قبل از اینکه هر ریکوئستی از مرورگر خارج شود، آن را متوقف کرده
// ، یک توکن امنیتی به آن بچسباند و بعد اجازه خروج بدهد.
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
});


//Request Interceptor را می‌نویسی تا توکن JWT را از localStorage بگیرد و به Header تمام ریکوئست‌ها بچسباند
//config: این شیء شامل تمام اطلاعات ریکوئست جاری (مثل URL، Method و Headers) است. ما این را می‌گیریم تا تغییرش دهیم.
api.interceptors.request.use((config) => {

 // در سمت سرور ما چیزی به نام localStorage نداریم. این خط چک می‌کند که «آیا ما در مرورگر هستیم؟». اگر بله، ادامه بده.
  if (typeof window !== 'undefined') {
      const state = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      const token = state.state?.access_token;    
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;   
      }
  }
  return config;
}, (error) => { // این بخش زمانی اجرا می‌شود که خودِ «ارسالِ ریکوئست» با خطا مواجه شود (مثلاً اینترنت قطع باشد یا مشکلی در تنظیمات ریکوئست باشد).
  return Promise.reject(error); //خطا را به مرحله بعدی (مثلاً لایه Service) می‌فرستد تا آنجا مدیریت شود.
});

export default api;