import { useEffect, useState } from "react";
import Widget from "../../../components/widget/Widget";
import Navbar from "../../../layout/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserThisMonth } from "../../../redux/user/userThunks";
import Charts from "../../../components/chart/Charts";
import { useParams } from "react-router-dom";
import { chartUserInMonth, getUserInHotel } from "../../../redux/hotel/hotelThunks";
import Datatable from "../../../components/datatable/Datatable";
import { userOrderColumns } from "./userOrderColumns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import NavbarHotel from "../../../layout/navbarHotel/NavbarHotel";
import { getTotalRevenuesByHotelId } from "../../../redux/order/orderThunk";
const TreeChart = ({ data , changeStareDate}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [2020, 2021, 2022, 2023];

  useEffect(() => {
    changeStareDate(selectedYear)
  }, [selectedYear]);

  return (
    <div className="w-full">
      <div className="pb-10 pl-6 pt-6">
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      </div>


      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


const HotelDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInMonth = useSelector((state) => state.hotel.userInMonth);
  const dataLineChart = useSelector((state)=> state.order.totalRevenuse)
  const usersInHotel = useSelector((state) => state.hotel.users)
  const [startDate, setStartDate] = useState(2023)
  
  useEffect(() => {
    dispatch(getUserInHotel(id));
    dispatch(chartUserInMonth(id));
    dispatch(getTotalRevenuesByHotelId({ hotelId: id, startYear: startDate}))
  }, []);
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
  return (
    <>

      <Navbar />
      <NavbarHotel />
      <div className="flex-1 dashboard">
        <div className="flex-6">
          <div className="flex p-5 gap-20">
            <Widget type="user" data={userInMonth} />
            <Widget type="user" data={userInMonth} />
            <Widget type="user" data={userInMonth} />
            <Widget type="user" data={userInMonth} />
          </div>
        </div>
        <div className="flex flex-1 mt-10 m-5 shadow-lg p-2 border border-gray-300 rounded-lg">
          <TreeChart 
          data={dataLineChart} 
          changeStareDate={setStartDate}
          />
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
