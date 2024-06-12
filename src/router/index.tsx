import { RouterProvider } from "react-router-dom";
import { routeList } from "./routers";

export default function Router() {
  return <RouterProvider router={routeList} />;
}
