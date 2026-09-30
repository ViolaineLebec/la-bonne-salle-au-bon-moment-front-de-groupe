import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

export interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    roleId: number
    roleLabel: string;
}

interface UserCardProps {
    user: User;
}

function UserCard({ user }: UserCardProps) {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const id = user.id;


    // async function deleteUser(id: number) {
    //     if (!id) return;

    //     const confirmed = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
    //     if (!confirmed) return;

    //     try {
    //         await userContext.deleteUser(id);
    //         window.alert("Suppression effectuée avec succès.");
    //     } catch (error) {
    //         console.error(error);
    //         window.alert("Erreur lors de la suppression de l'utilisateur.");
    //     }
    // }

    // async function updateUser(id: number, user: Salle) {
    //     await userContext.putUser(id, user);
    // }

    function navigateToUser() {
        navigate(`/users/${id}`);
    }

    return (
        <>

            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Prénom : <span className="font-medium text-gray-900">{user.firstname}</span></p>
                <p className="text-sm text-gray-500">Nom : <span className="font-medium text-gray-900">{user.lastname}</span></p>
                <p className="text-sm text-gray-500">Email : <span className="font-medium text-gray-900">{user.email}</span></p>
                {/* <button onClick={() => deleteUser(salle.id)}>Supprimer</button> */}
                <button onClick={navigateToUser}>Modifier</button>
            </div>

        </>

    );
}

export default UserCard;
