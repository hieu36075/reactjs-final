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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const TreeChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const yourChartData = [
  { month: 'January', revenue: 5000 },
  { month: 'February', revenue: 6000 },
  { month: 'March', revenue: 7500 },
  { month: 'April', revenue: 4000 },
  { month: 'May', revenue: 9000 },
  { month: 'June', revenue: 6500 },
  { month: 'July', revenue: 8000 },
  { month: 'August', revenue: 7000 },
  { month: 'September', revenue: 9500 },
  { month: 'October', revenue: 8500 },
  { month: 'November', revenue: 10000 },
  { month: 'December', revenue: 9500 }
];
const HotelDashboard = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const userInMonth = useSelector((state) => state.hotel.userInMonth);
  const usersInHotel = useSelector((state) => state.hotel.users)

  console.log(usersInHotel)
  useEffect(() => {
    dispatch(getUserInHotel(id));
    dispatch(chartUserInMonth(id));
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
      {/* <SidebarHotel/> */}
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
        <div className="flex flex-1 mt-10 m-5 shadow-lg p-2 border border-gray-300 rounded-lg">
        <TreeChart data={yourChartData} />
        </div>
        <div className="flex items-center justify-center w-full ">
          <div className="flex-6">
          <Datatable data={user} Columns={userOrderColumns} meta={usersInHotel?.meta} title="List Order In Hotel" />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default HotelDashboard;
