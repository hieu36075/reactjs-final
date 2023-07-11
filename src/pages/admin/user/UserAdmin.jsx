import { useEffect } from "react";
import "./userAdmin.scss"
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/adminNavbar";
import User from "../../../components/user/user";
import { getUsers } from "../../../context/user/userThunks";
import { useDispatch, useSelector } from "react-redux"

const UserList = () => {
  const dispatch = useDispatch()
  const {data} = useSelector((state)=> state.user)
  useEffect(()=>{
      dispatch(getUsers())
  },[])
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <AdminNavbar/>
        <User users={data}/>
      </div>
    </div>
  )
}

export default UserList