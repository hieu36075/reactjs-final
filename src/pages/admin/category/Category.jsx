import { useEffect, useState } from "react";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import { getCategory } from "../../../redux/category/categoryThunks";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { categoryColumns } from "./categoryColumns";
import Datatable from "../../../components/datatable/Datatable";

const Categories = () => {
  const dispatch = useDispatch()
  const {data, loading}= useSelector((state)=> state.category)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
      dispatch(getCategory({page:currentPage, perPage:5}))
  },[dispatch, currentPage])

  const handleDelete = (id) => {
    console.log(id)
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // if (!loading) {
  //   return <div>Loading...</div>;
  // }


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/users/new" style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
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
  const categories = data?.data?.map((data, index) => ({ ...data, index: index })) || [];
  return (
    <div className="flex w-full">
      <Sidebar/>
      <div className="flex-[2_2_0%]">
        <AdminNavbar/>
        <Datatable 
          data={categories} 
          Columns={categoryColumns} 
          actionColumn={actionColumn} 
          meta={data?.meta}
          title="Manager category"
          onPageChange={handlePageChange}
          isLoading={!loading}
        />
      </div>
    </div>
  )
}

export default Categories