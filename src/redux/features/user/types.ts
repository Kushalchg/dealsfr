// types for the api request payload and api response
export interface UserRegisterPayload {
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  password: string;
  confirm_password?: string;
}

export interface UserLoginPayload {
  email?: string;
  phone_number?: string;
  password: string;
}

interface Assignments {
  assignment_id: number;
  store_id: 3;
  role: "STORE_OWNER";
  branch_id: null | number;
}

export interface UserLoginResponse {
  message: string;
  data: {
    access: string;
    refresh: string;
  };
}

export interface GetUserResponse {
  id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  profile_image: string;
  user_type: "STORE_ADMIN" | "CUSTOMER";
  is_store_owner: boolean;
  is_super_admin: boolean;
  assignments: Assignments[];
  managed_stores: number[];
}
