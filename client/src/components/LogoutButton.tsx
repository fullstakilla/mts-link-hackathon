import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import useUserStore from "@/store/user-store";

export default function LogoutButton() {
    const { deleteUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem("auth_token");
            deleteUser();

            toast.success(`Вы успешно вышли из аккаунта.`);
            navigate("/login");
        } catch {
            toast.error(`Ошибка при выходе.`);
        }
    };

    return (
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            Выйти
        </DropdownMenuItem>
    );
}
