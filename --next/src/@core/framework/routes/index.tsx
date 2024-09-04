import { Route as RouteDom, BrowserRouter as RouterDom, Routes as RoutesDom } from "react-router-dom";

import Layout from "@core/presentation/layout";

/* pages */
import LoginPage from "@core/presentation/views/Login/page";
import RoomsPage from "@core/presentation/views/Rooms/page";
import RoomPage from "@core/presentation/views/Room/page";
import RoomRegisterPage from "@core/presentation/views/RoomRegister/page";
import UserPage from "@core/presentation/views/User/page";
import UserSettingsPage from "@core/presentation/views/UserSettings/page";

export default function Routes() {
  return (
    <RouterDom>
      <RoutesDom>
        <RouteDom path="/" element={<Layout />}>
          {/* Login */}
          <RouteDom index element={<LoginPage />} />
          {/* Salas */}
          <RouteDom path="/rooms" element={<RoomsPage />} />
          {/* CRUD Sala */}
          <RouteDom path="/room-register/:id" element={<RoomRegisterPage />} />
          {/* Sala */}
          <RouteDom path="/room/:id" element={<RoomPage />} />
          {/* Visualização do usuário */}
          <RouteDom path="/user/:id" element={<UserPage />} />
          {/* Perfil do usuário */}
          <RouteDom path="/user-settings" element={<UserSettingsPage />} />
        </RouteDom>
      </RoutesDom>
    </RouterDom>
  )
} 