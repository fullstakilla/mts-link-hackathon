interface Detail {
    MemberID: string;
    Key: string;
    Value: string;
}

interface Team {
    id: string;
    name: string;
    departmentID: string;
    departmentName: string;
    members: Member[];
}

export interface OneTeam {
    departmentID: string;
    departmentName: string;
    members: MembersInfo;
}

interface MembersInfo {
    departmentID: string;
    id: string;
    name: string;
    members: Member[];
}

export interface Member {
    id: string;
    fullname: string;
    email: string;
    teamID: string;
    team: Team;
    age: number;
    role: string;
    photoURL: string;
    details: Detail[];
}

export interface Department {
    departmentID: string;
    departmentName: string;
    teams: Team[];
}

export interface DepartmentMainPage {
    id: string;
    name: string;
    teamsCount: number;
    employeesCount: number;
}

export type GetAllDepartmentResponse = DepartmentMainPage[];

export type GetOneByIdResponse = Department;
