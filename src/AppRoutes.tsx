import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";
import UpdateReservation from "./pages/UpdateReservation";
import ViewReservation from "./pages/viewReservations";
import NewRoom from "./pages/NewRoom";
import UserList from "./pages/UserList";
import RoomList from "./pages/RoomList";
import ReservationList from "./pages/ReservationList";
import UpdateRoom from "./pages/UpdateRoom";
import UpdateUser from "./pages/UpdateUser";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginUser />} />

            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard/:role" element={<Dashboard />} />
            <Route path="/rooms/newroom" element={<NewRoom />} />
            <Route path="/rooms/:id" element={<UpdateRoom />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/signin" element={<FormCompte />} />
            <Route path="/createreservation" element={<CreateReservation />} />
            <Route path="/viewreservation" element={<ViewReservation />} />
            <Route path="/reservations/:id" element={<UpdateReservation />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UpdateUser />} />

            {/* </Route> */}
        </Routes>
    );
}

export default AppRoutes;
