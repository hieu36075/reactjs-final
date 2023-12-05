import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/login";
import Home from "../../pages/home/Home";
import Navbar from "../navbar/Navbar";
import AdminDashboard from "../../pages/admin/home/AdminDashboard";
import UserList from "../../pages/admin/user/UserList";
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
import BookingsPage from "../../pages/booking/bookings";
import MyHotelPage from "../../pages/myHotel/MyHotel";
import ChatForm from "../../pages/chat/ChatForm";
import BillPage from "../../pages/payment/Bill";
import New from "../../components/new/New";
import HotelList from "../../pages/admin/hotel/HotelList";
import ManagerHotel from "../../pages/ownerHotel/manager/ManagerHotel";
const Body = () => {
  return (
    <>
      <AlertPopup />
      <Routes>
      <Route path="/login" element={<RequireNoAuth element={<Login /> } />} />
      <Route path="/hotels/:id" element={<List />} />
      <Route path="/hotels/details/:id" element={<DetailsPage />} />
      <Route path="/hotels/stays/:id" element={<ConfirmationPaymentPage />} />
      <Route path="/hotels/new/:id" element={<HotelsFormPage />} />
      <Route path="/account/profile" element={<ProfilePage />} />
      <Route path="/account/myBooking" element={< BookingsPage/>} />
      <Route path="/account/myHotel" element={< MyHotelPage/>} />
      <Route path="/account/manager/:id" element={< ManagerHotel/>} />
      <Route path="/account/message" element={< ChatForm/>} />
      <Route path="/account/bill/:id" element={<BillPage />} />
      <Route path="/" element={<Navbar type="home"/>}>
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
              <Route path="new" element={<CategoryNewPage title="Add New Category"/>} />
              </Route>

              <Route path="hotel">
              <Route index element={<HotelList />} />
              </Route>
            </Route>
      </Routes>

    </>
  );
};

export default Body;