// import {RouterProvider, Outlet} from "react-router-dom";
// import router from "./Routers/Routes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import  { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';
import ProtectedRoute from './Routers/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { loginStatus } from './redux/loginPageReducer';
import { useNavigate, useLocation } from "react-router-dom";
const Login = lazy(()  => import('./pages/Login'));
const FoodManagement = lazy(() => import('./pages/FoodManagement'));
const ViewOrders = lazy(() => new Promise(resolve => setTimeout(resolve, 1000)).then(() => import('./pages/ViewOrders')));
const OrderDetail = lazy(() => import('./components/OrderDetail'));

function App() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   const token = window.localStorage.getItem('accessToken');
  //   if (token && location.pathname === '/') {
  //     navigate('/category');
  //   }
  // }, []);
  // console.log(location)
  return (
    <Router>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          {/* <Route path='/category' element={<FoodManagement />} /> */}
          {/* <Route path='/view' element={<ViewOrders />} /> */}
          {/* <Route path='/loading' element={<Loading />} /> */}
          <Route path='/category' element={<ProtectedRoute element={<FoodManagement />} />} />
          <Route path="/view" element={<ProtectedRoute element={<ViewOrders />} />} />
          <Route path="/loading" element={<ProtectedRoute element={<Loading />} />} />
          
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
