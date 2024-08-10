export interface Auth {
  id: string;
  token: string;
  username: string;
  email: string;
  phoneNumber: string;
  photoProfile: string | null;
  spvId: string;
  tenantId: string;
  tenantName: string;
  roleId: string;
  roleName: string;
  permission: AuthPermission[];
}

export interface AuthPermission {
  menuId: string;
  menuName: string;
  action: string;
  isEnable: boolean;
}

export interface VerifyOtp {
  email: string;
  token: string;
}

export interface ForgotPassword extends VerifyOtp {
  password: string;
}

export interface User extends Omit<Auth, 'token'> {}

export const CHATBOT_ACCESS_TOKEN = 'CHATBOT_ACCESS_TOKEN';
export const CHATBOT_USER = 'CHATBOT_USER';
