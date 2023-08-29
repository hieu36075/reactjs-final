
import "./adminDashboard.scss";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import Widget from "../../../components/widget/Widget";
import FeaturedChart from "../../../components/featuredChart/FeaturedChart";
import Chart from "../../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserThisMonth } from "../../../redux/user/userThunks";
import { getEarningInMonth, getMonthlyRevenues, getOrderInMonth, getTotalRevenues } from "../../../redux/order/orderThunk";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const userInMonth = useSelector((state)=> state.user.data);
  const orderInMonth = useSelector((state) => state.order.orderInMonth);
  const earningInMonth = useSelector((state)=> state.order.earningInMonth)
  const monthRevenues = useSelector((state)=> state.order.monthRevenuse)
  const totalRevenuse = useSelector((state) => state.order.totalRevenuse)

  useEffect(()=>{
    dispatch(getUserThisMonth());
    dispatch(getOrderInMonth());
    dispatch(getEarningInMonth());
    dispatch(getMonthlyRevenues());
    dispatch(getTotalRevenues());
  },[])
  return (
    <div className="homeAdmin">
      <Sidebar />
      <div className="homeContainerAdmin"> 
        <AdminNavbar />
        <div className="widgets-admin">
          <Widget type="user" data={userInMonth}/>
          <Widget type="order" data={orderInMonth}/>
          <Widget type="earning" data={earningInMonth} />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <FeaturedChart data={totalRevenuse}/>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} data={monthRevenues} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;