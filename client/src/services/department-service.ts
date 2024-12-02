import $api from "@/https/api";
import {
    Department,
    GetAllDepartmentResponse,
    Member,
    OneTeam,
} from "@/types/departments";
import { AxiosResponse } from "axios";

export default class DepartmentService {
    static async getAllDepartments(): Promise<
        AxiosResponse<GetAllDepartmentResponse>
    > {
        return $api.get("departments/all");
    }

    static async getOneDepartmentById(
        id: string
    ): Promise<AxiosResponse<Department>> {
        return $api.get(`teams/${id}`);
    }

    // static async getOneMemberById(
    //     id: string
    // ): Promise<AxiosResponse<Department>> {
    //     return $api.get(`teams/${id}`);
    // }
    static getOneMemberById(id: string): Promise<AxiosResponse<Member>> {
        return $api.get(`members/${id}`);
    }
    static getOneTeamById(id: string): Promise<AxiosResponse<OneTeam>> {
        return $api.get(`teams/one/${id}`);
    }
}
