import { useEffect } from "react";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import { getUsers } from "../../../redux/user/userThunks";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { userColumns } from "./userColumns";
import Datatable from "../../../components/datatable/Datatable";
const UserList = () => {
  const dispatch = useDispatch()
  const {data, loading} = useSelector((state)=> state.user)
  
  useEffect(()=>{
      dispatch(getUsers({page:1, perPage:5}))
  },[dispatch])

  const handleDelete = (id) => {
    console.log(id)
    // setData(data.filter((item) => item.id !== id));
  };
  if (!loading) {
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
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
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
            </div>
          </div>
        );
      },
    },
  ];

  const user = data?.data?.map((data, index) => ({ ...data, index: index }));

  return (
    <div className="flex w-full">
      <Sidebar/>
      <div className="flex-[2_2_0%]">
        <AdminNavbar/>
        <Datatable data={user} Columns={userColumns} actionColumn={actionColumn} meta={data?.meta} title="Manager User"/>
      </div>
    </div>
  )
}

export default UserList