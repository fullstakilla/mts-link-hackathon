import { create, StateCreator } from "zustand";
import { UserStoreState } from "@/types/user";
import AuthService from "@/services/auth-service";

const userState: StateCreator<UserStoreState> = (set) => ({
    user: undefined,
    isAuth: undefined,
    setUser: (user) => set({ user, isAuth: true }),
    deleteUser: () => set({ user: undefined, isAuth: false }),
    checkAuth: async () => {
        try {
            const response = await AuthService.identity();
            set({ user: response.data, isAuth: true });
        } catch (error) {
            console.error("Ошибка в проверке токена:", error);
            set({ isAuth: false });
        }
    },
});

const useUserStore = create(userState);

export default useUserStore;
