import { RouteObject } from "react-router-dom";

/* pages */
import HomePage from "pages/HomePage/page";
import RoomPage from "pages/RoomPage/page";
import LoginPage from "pages/LoginPage/page";

export const routeList: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: 'room/:id',
    element: <RoomPage />
  }
]
