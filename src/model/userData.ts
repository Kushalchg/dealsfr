export interface SetUserData {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    password: string;
    confirm_password?: string;
}

export interface GetUserData {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    profile_image: string; 
    user_type: "STORE_ADMIN" | "CUSTOMER";
}

export interface UserLoginRequest{
    email?: string;
    phone_number?: string;
    password?: string;
}

export interface UserLoginResponse{
    access: string;
    refresh: string;
}