import { useState } from "react";
import { UserContext, type User } from "../context/UserContext";



function UserProvider({ children }: { children?: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userList, setUserList] = useState<User[]>([]);
    const url = 'http://localhost:3000/users';

    const login = (data: User) => {
        setUser(data);
    };
    const logout = () => {
        setUser(null);
    };

    async function getUserList() {
        try {
            const res = await fetch("http://localhost:3000/users");
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            const data = await res.json();
            setUserList(data);
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }

    async function getUserById(id: number) {
        try {
            const res = await fetch(url + "/" + id);
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            const data = await res.json();
            setUserList(data);
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }

    async function postUser(user: User) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
    }

    async function patchUser(id: number, user: User) {
        const res = await fetch((url + "/" + id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
    }

    async function deleteUser(id: number) {
        const res = await fetch((url + "/" + id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        setUserList((prevUserList) => prevUserList.filter((user: User) => user.id !== id));
    }

    return (
        <UserContext.Provider value={{ user, login, logout, getUserList, userList, getUserById, deleteUser, patchUser, postUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;