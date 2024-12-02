import $api from "@/https/api";
import { AuthResponse, LoginRequest } from "@/types/auth";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export default class AuthService {
    static async login(
        formData: LoginRequest
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post("auth/login", formData);
    }

    static async identity(): Promise<AxiosResponse<User>> {
        return $api.get("auth/identity");
    }
}
