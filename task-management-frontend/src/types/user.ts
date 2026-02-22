export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user';
  isActive:boolean;
  createdAt:string;
  updatedAt:string;
}

export type UserDto = Omit < IUser ,'id' | 'createdAt' | 'updatedAt'>;

export type  UpdateUserByAdminDto= Partial<UserDto>;

export type UpdateUserProfileDto = Partial <Pick<IUser, 'first_name' | 'last_name' | 'email' >>;