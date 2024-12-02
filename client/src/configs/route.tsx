import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import Layout from "@/components/Layout";
import DepartmentPage from "@/pages/DeparmentPage/DepartmentPage";
import { AuthGuard, NotAuthGuard } from "@/components/auth-guards";
import MemberPage from "@/pages/EmployeePage/MemberPage";
import TeamPage from "@/pages/TeamPage/TeamPage";

export enum routesPath {
    LOGIN = "/login",
    MAIN = "/",
    DEPARTMENT = "/department/:id",
    MEMBER = "/member/:id",
    TEAM = "/teams/:id",
}

export const routerConfig: RouteObject[] = [
    {
        path: routesPath.LOGIN,
        element: (
            <NotAuthGuard>
                <LoginPage />
            </NotAuthGuard>
        ),
    },
    {
        path: routesPath.MAIN,
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                path: routesPath.MAIN,
                element: <MainPage />,
            },
            {
                path: routesPath.DEPARTMENT,
                element: <DepartmentPage />,
            },
            {
                path: routesPath.MEMBER,
                element: <MemberPage />,
            },
            {
                path: routesPath.TEAM,
                element: <TeamPage />,
            },
        ],
    },
];
