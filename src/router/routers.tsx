import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/page";

export const routeList = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
