import "./userAdmin.scss"
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/adminNavbar";
import User from "../../../components/user/user";

const UserList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <AdminNavbar/>
        <User/>
      </div>
    </div>
  )
}

export default UserList