import { useEffect } from "react";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import { changeActive, getUsers } from "../../../redux/user/userThunks";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { hotelColumns } from "./hotelColumns";
import Datatable from "../../../components/datatable/Datatable";
import { activeHotel, bandHotel, getHotelsByAdmin } from "../../../redux/hotel/hotelThunks";
const HotelList = () => {
  const dispatch = useDispatch()
  const { loading} = useSelector((state)=> state.hotel)
  const data = useSelector((state)=> state.hotel.list)
  console.log(data)
  useEffect(()=>{
      dispatch(getHotelsByAdmin({page:1, perPage:5}))
  },[dispatch])

  const handleDelete = (id) => {
    dispatch(bandHotel(id));
  };

  const handleActive = (id) => {
    dispatch(activeHotel({id: id}));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className= {params.row.isActive ? "deleteButton" : "activeButton"}
              onClick={() =>
                params.row.isActive?
                 handleDelete(params.row.id)
                 :handleActive(params.row.id)
                }
            >
              {params.row.isActive ? "Ban" : "Active"}
            </div>
          </div>
        );
      },
    },
  ];

  const hotel = data?.data?.map((data, index) => ({ ...data, index: index }));

  return (
    <div className="flex w-full">
      <Sidebar/>
      <div className="flex-[2_2_0%]">
        <AdminNavbar/>
        <Datatable data={hotel} Columns={hotelColumns} actionColumn={actionColumn} meta={data?.meta} title="Manager User"/>
      </div>
    </div>
  )
}

export default HotelList