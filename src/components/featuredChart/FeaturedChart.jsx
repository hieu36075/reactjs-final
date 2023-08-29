import "./featuredChart.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const FeaturedChart = ({data}) => {
  const growthRate = 0.05;
  const target = data.lastMonthRevenue * (1 + growthRate);
  const progress = (data.lastWeekRevenue / target) * 100;

  return (
    <div className="featured-chart">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
        <CircularProgressbar value={progress} text={`${progress.toFixed(2)}%`} strokeWidth={5} />
        </div>
        <p className="title">Total booking  today</p>
        <p className="amount">${data.todayRevenue}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className={`itemResult ${target > data.lastWeekRevenue ? 'negative' : 'positive'}`}>
            {target > data.lastWeekRevenue ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowUpOutlinedIcon fontSize="small" />}
            <div className="resultAmount">${target.toFixed(2)}</div>
          </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Week</div>
            <div className={`itemResult ${data?.thisWeekRevenue >= data?.lastWeekRevenue ? 'positive' : 'negative'}`}>
              {data?.thisWeekRevenue >= data?.lastWeekRevenue ? (
                <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              ) : (
                <KeyboardArrowDownIcon fontSize="small"/>
              )}
              <div className="resultAmount">
              ${(Math.abs(data?.thisWeekRevenue - data?.lastWeekRevenue)).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Month</div>
            <div className={`itemResult ${data?.thisMonthRevenue >= data?.lastMonthRevenue ? 'positive' : 'negative'}`}>
              {data?.thisMonthRevenue >= data?.lastMonthRevenue ? (
                <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              ) : (
                <KeyboardArrowDownIcon fontSize="small"/>
              )}
              <div className="resultAmount">
              ${(Math.abs(data?.thisMonthRevenue - data?.lastMonthRevenue)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;