import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { ChangeEvent, FormEvent } from "react";
import { UserContext } from "../context/UserContext";

interface User {
    firstname: string,
    lastname: string,
    email: string
}

function UpdateUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userContext = useContext(UserContext);

    const [user, setUser] = useState<User | null>(null);
    const [form, setForm] = useState<User>({
        firstname: "",
        lastname: "",
        email: ""
    });

    useEffect(() => {
        if (userContext?.getUserList) {
            userContext.getUserList();
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:3000/users/${id}`);
            const data = await response.json();
            setUser(data);
        };

        if (id) fetchUser();
    }, [id]);

    useEffect(() => {
        if (user) {
            setForm({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            });
        }
    }, [user]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = event.target;
        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value
        });
    }

    async function patchUser(id, donnees: User) {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return response.json();
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (user === null) return;

        const confirmed = window.confirm("Voulez-vous vraiment modifier cet utilisateur ?");
        if (!confirmed) return;

        try {
            await patchUser(Number(id), form);
            window.alert("Modifications effectuées avec succès.");
            navigate("/users");
        } catch (error) {
            console.error(error);
            window.alert("Erreur lors de la mise à jour de l'utilisateur.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="m-2 p-2 border">
                    <label>Prénom </label>
                    <input
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="m-2 p-2 border">
                    <label>Nom </label>
                    <input
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="m-2 p-2 border">
                    <label>Email </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Enregistrer
                </button>
            </form>
        </div>
    );
}

export default UpdateUser;