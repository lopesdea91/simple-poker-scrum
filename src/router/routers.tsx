import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";

export const routeList = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
