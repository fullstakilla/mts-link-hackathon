import $api from "@/https/api";
import { Member } from "@/types/departments";
import { AxiosResponse } from "axios";

export default class MemberService {
  static async getMemberByDetails(
    details: string
  ): Promise<AxiosResponse<Member[]>> {
    return $api.get("members/all", {
      params: {
        details: details,
      },
    });
  }

  static async updateMember(
    memberId: string,
    updatedMember: Partial<Member>
  ): Promise<AxiosResponse<Member>> {
    return $api.put(`members/${memberId}`, updatedMember);
  }
}
