import { useEffect } from "react";
import "./userAdmin.scss"
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import { getUsers } from "../../../context/user/userThunks";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { userColumns } from "./userColumns";
import Datatable from "../../../components/datatable/Datatable";
const UserList = () => {
  const dispatch = useDispatch()
  const {data} = useSelector((state)=> state.user)
  useEffect(()=>{
      dispatch(getUsers())
  },[dispatch])

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

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
          </div>
        );
      },
    },
  ];

  const user = data.map((data, index) => ({ ...data, index: index }));

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <AdminNavbar/>
        <Datatable data={user} Columns={userColumns} actionColumn={actionColumn} />
      </div>
    </div>
  )
}

export default UserList