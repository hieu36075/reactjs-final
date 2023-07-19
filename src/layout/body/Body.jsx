import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/login";
// import HTMLPage from "../../components/Auth/loginGoogle";
import Home from "../../pages/home/Home";
import Navbar from "../navbar/navbar";
import AdminDashboard from "../../pages/admin/home/adminDashboard";
import UserList from "../../pages/admin/user/UserList";
import New from "../../pages/admin/new/new";
import PrivateRoute from "../../routes/PrivateRoutes";
import NewProfile from "../../pages/admin/profile/NewProfile";
import Categories from "../../pages/admin/category/Category";
import CategoryNewPage from "../../pages/admin/category/CategoryNewPage";


const Body = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Routes>
      {/* <Route path="/" element={<Navbar/>}/> */}
      <Route path="/login" element={<Login />} />

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