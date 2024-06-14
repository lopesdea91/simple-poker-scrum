import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "components/layout";
import { routeList } from "./routers";

const applyLayout = (el: RouteObject): RouteObject => {
  return { ...el, element: <Layout>{el.element}</Layout> }
}
const router = createBrowserRouter(routeList.map(applyLayout));

export default function Router() {
  return <RouterProvider router={router} />;
}
