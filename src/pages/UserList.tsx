import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import UserCard from "../composants/UserCard";

function UserList() {
    const userContext = useContext(UserContext);
    useEffect(() => { userContext.getUserList() }, [])

    return (

        <>
            <div className="grid grid-cols-4 mt-10 p-5">
                {userContext.userList.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}

export default UserList