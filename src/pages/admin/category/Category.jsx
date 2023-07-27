import { useEffect } from "react";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import { getCategory } from "../../../redux/category/categoryThunks";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { categoryColumns } from "./categoryColumns";
import Datatable from "../../../components/datatable/Datatable";

const Categories = () => {
  const dispatch = useDispatch()
  const {data, loadding}= useSelector(state=> state.category)

  useEffect(()=>{
      dispatch(getCategory())
  },[dispatch])

  const handleDelete = (id) => {
    console.log(id)
  };

  if (loadding) {
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
          </div>
        );
      },
    },
  ];

  const categories = data?.map((data, index) => ({ ...data, index: index }));
  return (
    <div className="list_table">
      <Sidebar/>
      <div className="listContainer_table">
        <AdminNavbar/>
        <Datatable data={categories} Columns={categoryColumns} actionColumn={actionColumn} />
      </div>
    </div>
  )
}

export default Categories