export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    zipcode: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  zipcode: string;
}

export interface UserState {
  users: IUser[]; 
  pending: boolean;
  error: string;
}
