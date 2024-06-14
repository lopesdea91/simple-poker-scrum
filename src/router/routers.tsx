import { RouteObject } from "react-router-dom";

/* pages */
import HomePage from "../pages/HomePage/page";
import RoomPage from "pages/RoomPage/page";

export const routeList: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: 'room/:id',
    element: <RoomPage />
  }
]
