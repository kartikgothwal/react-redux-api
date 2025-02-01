export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    zipcode: string;
  };
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  zipcode: string;
}
