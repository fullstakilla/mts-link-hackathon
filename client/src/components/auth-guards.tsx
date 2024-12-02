import useUserStore from "@/store/user-store";
import { Navigate } from "react-router-dom";
import Spinner from "./ui/spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuth } = useUserStore();

    if (isAuth === undefined) {
        return <Spinner />;
    }

    return isAuth ? children : <Navigate to="/login" replace />;
}

export function NotAuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuth } = useUserStore();

    if (isAuth === undefined) {
        return <Spinner />;
    }

    return isAuth ? <Navigate to="/" replace /> : children;
}
