export type User = {
  id: string;
  username: string;
  email: string;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};