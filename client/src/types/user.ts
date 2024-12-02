export type User = {
    id: number;
    username: string;
};

export type UserStoreState = {
    user: User | undefined;
    isAuth: boolean | undefined;
    setUser: (user: User) => void;
    deleteUser: () => void;
    checkAuth: () => Promise<void>;
};
