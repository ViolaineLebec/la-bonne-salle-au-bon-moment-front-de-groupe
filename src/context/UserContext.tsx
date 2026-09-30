import { createContext } from "react";

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    roleId: string
    roleLabel: string;
};


type UserContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    userList: User[];
    getUserList: () => void;
    getUserById: (id: number) => void;
    deleteUser: (id: number) => void;
    patchUser: (id: number, user: User) => void;
    postUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | null>(null);