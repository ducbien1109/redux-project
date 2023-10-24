import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import MuSicDetail from "../pages/detail/MusicDetail";
import AdminAntd from "../admin/AdminAntd";
import path from "./path";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
     
      
    ],
  },
  {
    path: path.AdminAntd,
    element: <AdminAntd />,
  },
  {
    path: path.muSicDetail,
    element: <MuSicDetail/>,
  },
  {
    path: path.editMusic,
    element: <AdminAntd/>,
  },
]);

export default router;
