
import "./adminDashboard.scss";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/adminNavbar";
import Widget from "../../../components/widget/Widget";
import FeaturedChart from "../../../components/featuredChart/FeaturedChart";
import Chart from "../../../components/chart/Chart";

const AdminDashboard = () => {
  return (
    <div className="homeAdmin">
      <Sidebar />
      <div className="homeContainerAdmin"> 
        <AdminNavbar />
        <div className="widgets-admin">
              <Widget type="user"/>
              <Widget type="order"/>
              <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <FeaturedChart />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;