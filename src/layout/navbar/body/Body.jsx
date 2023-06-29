import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../../pages/Login/login";
import HTMLPage from "../../../components/Auth/loginGoogle";
import Home from "../../../pages/Home/Home";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/login/google" element={<HTMLPage />} />
      </Routes>
    </>
  );
};

export default Body;