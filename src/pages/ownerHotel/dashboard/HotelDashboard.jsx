import { useEffect } from "react";
import Widget from "../../../components/widget/Widget";
import Navbar from "../../../layout/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserThisMonth } from "../../../redux/user/userThunks";
import Charts from "../../../components/chart/Charts";
import SidebarHotel from "../../../layout/sidebarHotel/SidebarHotel";

const HotelDashboard = () => {
  const dispatch = useDispatch();
  const userInMonth = useSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(getUserThisMonth());
  });

  const hotelBookingsData = [10, 15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50];
const userData = [25, 35];
  return (
    <>
      <Navbar />
      <SidebarHotel/>
      <div className="flex-1 ">
        <div className="flex flex-col p-5 border-b-2">
          <h1>title</h1>
          <h2>Name</h2>
          <h2> Description </h2>
        </div>
        <div className="flex-6">
          <div className="flex p-5 gap-20">
            <Widget type="user" data={userInMonth} />
            <Widget type="user" data={userInMonth} />
            <Widget type="user" data={userInMonth} />
            <Widget type="user" data={userInMonth} />
          </div>
        </div>
        <div className="flex-6">
          <Charts
            hotelBookingsData={hotelBookingsData
            }
            userData={
                userData
            }
          />
        </div>
      </div>
    </>
  );
};

export default HotelDashboard;
