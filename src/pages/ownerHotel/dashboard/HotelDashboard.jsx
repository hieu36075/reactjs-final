import { useEffect } from "react";
import Widget from "../../../components/widget/Widget";
import Navbar from "../../../layout/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserThisMonth } from "../../../redux/user/userThunks";
import Charts from "../../../components/chart/Charts";
import SidebarHotel from "../../../layout/sidebarHotel/SidebarHotel";
import { useParams } from "react-router-dom";
import { chartUserInMonth, getUserInHotel } from "../../../redux/hotel/hotelThunks";
import Datatable from "../../../components/datatable/Datatable";
import { userOrderColumns } from "./userOrderColumns";
// import "./HotelDashboard.css"

const HotelDashboard = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const userInMonth = useSelector((state) => state.hotel.userInMonth);
  const usersInHotel = useSelector((state) => state.hotel.users)

  console.log(usersInHotel.meta)
  useEffect(() => {
    dispatch(chartUserInMonth(id))
  },[]);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Band
            </div> */}
          </div>
        );
      },
    },
  ];
  const user = usersInHotel?.user?.map((data, index) => ({ ...data, index: index }));
  const hotelBookingsData = [10, 15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50];
const userData = [25, 35];
  return (
    <>

    <Navbar />
      <SidebarHotel/>
      <div className="flex-1 dashboard">
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
        <div className="flex w-max ">
          <div className="flex-6">
          <h1>abc</h1>
          <Datatable data={user} Columns={userOrderColumns} meta={usersInHotel?.meta} actionColumn={actionColumn} title="List Order In Hotel" />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default HotelDashboard;
