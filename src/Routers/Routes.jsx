import { createBrowserRouter } from "react-router-dom";
import ViewOrders from "../pages/ViewOrders";
import Login from "../pages/Login";
import Header from "../layout/Header";
import OrderDetail from "../components/OrderDetail";
import FoodManagement from "../pages/FoodManagement";
import EditOrder from "../components/EditOrder";
import PopUpDelete from "../components/PopUpDelete";
import Loading from "../components/Loading";
import ProtectedRoute from "./ProtectedRoute";
// import FoodManagement from "../pages/TestPM";
// import ViewOrders from "../pages/TestOM";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/test-header",
        element: <Header />,
    },
    {
        path: "/test-order-detail",
        element: <OrderDetail />,
    },
    {
        path: "/view",
        element: <ViewOrders />,
    },
    {
        path: "/category",
        element: <FoodManagement />,
    },
    {
         path: "/edit",
        element: <EditOrder />,
    },
    {
        path: "/delete",
       element: <PopUpDelete />,
   },
   {
    path: "/loading",
    element: <Loading />,
    }

]);

export default router;
