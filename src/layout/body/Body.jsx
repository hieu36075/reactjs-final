import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/login";
// import HTMLPage from "../../components/Auth/loginGoogle";
import Home from "../../pages/Home/Home";
import Navbar from "../navbar/navbar";
import AdminDashboard from "../../pages/admin/home/AdminDashboard";
import UserList from "../../pages/admin/user/UserAdmin";
import New from "../../pages/admin/new/new";



const Body = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Routes>
      {/* <Route path="/" element={<Navbar/>}/> */}
      <Route path="/" element={<Navbar // 
            // isAuth={isAuth}
            // setIsAuth={setIsAuth}
            // mode={mode}
            // setMode={setMode}
          />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
      </Route>

        {/* <Route path="/login/google" element={<HTMLPage />} /> */}

        <Route path="/admin" > 
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path="new" element={<New title="Add New Product" />} />
              </Route>
            </Route>
      </Routes>

    </>
  );
};

export default Body;