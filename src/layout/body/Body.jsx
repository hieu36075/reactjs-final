import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/login";
import Home from "../../pages/home/Home";
import Navbar from "../navbar/navbar";
import AdminDashboard from "../../pages/admin/home/AdminDashboard";
import UserList from "../../pages/admin/user/UserList";
import New from "../../pages/admin/new/new";
import PrivateRoute from "../../routes/PrivateRoutes";
import NewProfile from "../../pages/admin/profile/NewProfile";
import Categories from "../../pages/admin/category/Category";
import CategoryNewPage from "../../pages/admin/category/CategoryNewPage";
import List from "../../pages/list/List";
import DetailsPage from "../../pages/detail/DetailsPage";
import ConfirmationPaymentPage from "../../pages/payment/ConfirmationPaymentPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import HotelsFormPage from "../../pages/hotel/HotelsFormPage";
import AlertPopup from "../../components/aleart/AlertPopup";
import RequireNoAuth from "../../routes/RequireNoAuth";
const Body = () => {
  return (
    <>
      <AlertPopup />
      <Routes>
      <Route path="/login" element={<RequireNoAuth element={<Login />} />} />
      <Route path="/hotels/:id" element={<List />} />
      <Route path="/hotels/details/:id" element={<DetailsPage />} />
      <Route path="/hotels/stays/:id" element={<ConfirmationPaymentPage />} />
      <Route path="/hotels/new" element={<HotelsFormPage />} />
      <Route path="/account" element={<ProfilePage />} />
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>}/>

      </Route>
        <Route path="/admin" element={<PrivateRoute allowedRoles={['Admin']}/>}> 
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path="new" element={<New title="Add New Product" />} />
                  <Route path="newProfile" element={<NewProfile title="Add New Profile" />} />
              </Route>

              <Route path="category">
              <Route index element={<Categories />} />
              <Route path="new" element={<CategoryNewPage/>} />
              </Route>
            </Route>
      </Routes>

    </>
  );
};

export default Body;