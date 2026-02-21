export interface User {
  id: number;
  email: string;
  fullName: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    access_token: string;
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
    };
  };
}