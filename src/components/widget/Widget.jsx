import "./widget.scss"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type, data }) => {
  let form;


  switch (type) {
    case "user":
      form = {
        title: "USERS",
        isMoney: false,
        link: "See all users", 
        total: data.usersThisMonth,
        diff: ((data.usersThisMonth - data.usersLastMonth)/ data.usersLastMonth) *100 ,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      form = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        total: data.thisMonth,
        diff: ((data.thisMonth - data.lastMonth)/ data.lastMonth) *100,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      form = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        total: data.thisMonth,
        diff: ((data.thisMonth - data.lastMonth)/ data.lastMonth) *100,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      form = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title_name">{form.title}</span>
        <span className="counter">
          {form.isMoney && "$"} {form.total}
        </span>
        <span className="link">{form.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {form.diff.toFixed(1)} %
        </div>
        {form.icon}
      </div>
    </div>
  );
};

export default Widget;